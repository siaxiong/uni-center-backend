import { UserTable} from "../../database/database-functions";
import prismaClient from "../../database/prismaClient";
import { Prisma, EnrollmentStatus, User } from "@prisma/client";
import {createUniqueID} from "../../database/createUniqueID";
import { auth0ManagementClient } from "../Auth0/Auth0";
import { ENV_API } from "../../../EnvironmentVariables";
import { UserService } from "../services";


export const createUserRecord = async function(userRecordPayload: Omit< Prisma.UserCreateManyInput, "id">, id?:string){
	if(!id) id = await createUniqueID("User"); 
	return UserTable.createUserRecord(Object.assign({id},userRecordPayload));
};

export const isUserExist = async function(payload: {email:string}){
	return UserTable.isUserExist(payload);
};

export const getUsers = async function(){
	return UserTable.getUsers();
};
export const getUniqueUser = async function(payload:{id:string}){
	return UserTable.getUniqueUser(payload);	
};

export const getFilteredUsers = async function(payload: Partial<User>){
	return UserTable.getFilteredUsers(payload);
};
export const updateUser = async function(payload: {id:string&Partial<Omit<User, "id" | "enrollmentStatus">>,enrollmentStatus: EnrollmentStatus}){
	const user = await UserTable.getUniqueUser({id:payload.id});
	if(payload.enrollmentStatus === "Accepted" && payload.id){
		const userRecord = await UserService.getFilteredUsers({id:payload.id});
		const user = userRecord[0];
		if(user.role === "Admin") auth0ManagementClient.assignRolestoUser({id: payload.id},{roles:[ENV_API.AdminRoleID]});
		if(user.role === "Professor") auth0ManagementClient.assignRolestoUser({id: payload.id},{roles:[ENV_API.ProfessorRoleID]});
		if(user.role === "Student") auth0ManagementClient.assignRolestoUser({id: payload.id},{roles:[ENV_API.StudentRoleID]});
	}
	return UserTable.updateUser(payload);
};

export const deleteUser = async function(payload: {id: string} ){
	//it seems like it needs to use the same "prismaClient" instantiation
	//thus, importing from diff module would use diff instantiation cause transaction to not work
	const userRecord = await UserService.getUniqueUser(payload);

	switch(userRecord?.role){
	case "Professor": {
		const professorCourses = await prismaClient.professorCourse.findMany({where:{professorId:payload.id}});
		const deleteAssignments = professorCourses.map(professorCourse=>prismaClient.assignment.deleteMany({where:{professorCourseId:professorCourse.id}}));
		
		const students = await Promise.all(professorCourses.map(professorCourse=>prismaClient.studentCourse.findMany({where:{professorCourseId:professorCourse.id}})));
		const flatStudents = students.flat();
		const deleteStudentSubmissionAssignments = flatStudents.map(student=>prismaClient.assignmentSubmission.deleteMany({where:{studentCourseId:student.id}}));
		const deleteStudentCourses = flatStudents.map(student=>prismaClient.studentCourse.deleteMany({where:{id:student.id}}));
		const deleteProfessorCourses = professorCourses.map(professorCourse=>prismaClient.professorCourse.deleteMany({where:{professorId:professorCourse.professorId}}));

		await auth0ManagementClient.deleteUser({id:payload.id});
		return prismaClient.$transaction([...deleteStudentSubmissionAssignments, ...deleteStudentCourses, ...deleteAssignments,...deleteProfessorCourses, prismaClient.professorCourse.deleteMany({where:{id:userRecord.id}}), prismaClient.user.deleteMany({where:{id:userRecord.id}})]);
		
	}
	case "Student": {
		const studentCourses = await prismaClient.studentCourse.findMany({where: {studentId:userRecord.id}});
		const deleteAssignmentSubmissions = studentCourses.map(studentCourse=>prismaClient.assignmentSubmission.deleteMany({where:{studentCourseId:studentCourse.id}}));
		const deleteStudentCourses = studentCourses.map(studentCourse=>prismaClient.studentCourse.deleteMany({where:{id:studentCourse.id}}));
		
		await auth0ManagementClient.deleteUser({id:payload.id});
		return prismaClient.$transaction([...deleteAssignmentSubmissions, ...deleteStudentCourses, prismaClient.user.deleteMany({where:{id:userRecord.id}})]);
	}
	case "Admin": {
		await auth0ManagementClient.deleteUser({id:payload.id});
		return prismaClient.user.delete({where:{id:payload.id}});
	}
	}
};
