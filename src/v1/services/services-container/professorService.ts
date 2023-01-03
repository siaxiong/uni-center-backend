import {ProfessorTable} from "../../database/database-functions";
import {UserService } from "../services";
import {User,ProfessorCourse ,Course} from "@prisma/client";
// eslint-disable-next-line @typescript-eslint/no-var-requires
import {createUniqueID} from "../../database/createUniqueID";
import prismaClient from "../../database/prismaClient";


export const getProfessorCourses= async function(payload:{professorId?:string, id?:string}){
	console.log("8888");
	if(payload.professorId) return ProfessorTable.getFilteredProfessorCourses({professorId:payload.professorId});
	else if (payload.id) return ProfessorTable.getFilteredProfessorCourses({id:payload.id});
	return ProfessorTable.getProfessorCourses();
};

export const getUniqueProfessorCourse = async function(payload:{id:string}){
	return ProfessorTable.getUniqueProfessorCourse(payload);
};

export const getFilteredProfessorCourses = async function(payload: Partial<ProfessorCourse>){
	// return ProfessorTable.getFilteredProfessors(payload);
	const data = await ProfessorTable.getFilteredProfessorCourses(payload);
	const filteredData = data.map(record=><{professorCourseId:string, user:User, course:Course}>{
		professorCourseId:record.id,
		course: record.course,
		user: record.user,
	});

	return filteredData;
};

export const getDistinctCourse = async function(){
	return ProfessorTable.getDistinctCourse();
};

type CreateProfessorType = Omit<ProfessorCourse, "id">;

export const createProfessorCourse = async function(payload: CreateProfessorType){
	const userRecord = (await UserService.getFilteredUsers({id: payload.professorId}))[0];
	const id = await createUniqueID("ProfessorCourse");
	if(!(userRecord.enrollmentStatus === "Accepted")) throw new Error("User's enrollment is not accepted yet!");
	
	return ProfessorTable.createProfessorCourse(Object.assign({id},payload));
};

export const deleteProfessorCourse = async function(payload: {id:string}){
	const professorCourse = await prismaClient.professorCourse.findUniqueOrThrow({where:{id:payload.id}});
	const deleteAssignments = prismaClient.assignment.deleteMany({where:{professorCourseId:professorCourse.id}});
	
	const studentCourses = await prismaClient.studentCourse.findMany({where:{professorCourseId:professorCourse.id}});
	const deleteStudentCourses = prismaClient.studentCourse.deleteMany({where:{professorCourseId:professorCourse.id}});
	const deleteAssignmentSubmissions = studentCourses.map(studentCourse=>prismaClient.assignmentSubmission.deleteMany({where:{studentCourseId:studentCourse.id}}));

	return prismaClient.$transaction([...deleteAssignmentSubmissions, deleteStudentCourses, deleteAssignments, prismaClient.professorCourse.deleteMany({where:{id:payload.id}})]);

	// return ProfessorTable.deleteProfessorCourse(payload);
};




