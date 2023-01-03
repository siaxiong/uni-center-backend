import { StudentCourse } from "@prisma/client";
import { StudentTable} from "../../database/database-functions";
import { createUniqueID } from "../../database/createUniqueID";
import { AssignmentSubmissionService, AssignmentService, ProfessorService, UserService, CourseService } from "../services";
import prismaClient from "../../database/prismaClient";


export const createStudentCourse= async function(payload: Omit<StudentCourse,"id">){
	const id = await createUniqueID("StudentCourse");
	const studentCourseRecord = await StudentTable.createUserCourse({id,...payload});
	console.log("🚀 ~ file: studentCourseService.ts:11 ~ createStudentCourse ~ studentCourseRecord", studentCourseRecord);
	const assignments = await AssignmentService.getAssignments({professorCourseId:payload.professorCourseId});
	await Promise.all(assignments.map(assignment=>AssignmentSubmissionService.createAssignmentSubmission({assignmentId:assignment.id,professorCourseId:payload.professorCourseId})));
	return studentCourseRecord;
};

export const getStudentCourses = async function(){
	return StudentTable.getStudentCourses();
};

export const getFilteredStudentCourses = async function(payload: Partial<StudentCourse>){
	const studentCourses = await StudentTable.getFilteredStudentCourses(payload);
	return Promise.all(studentCourses.map(
		async record=>{
			const professorCourseRecord = await ProfessorService.getUniqueProfessorCourse({id:record.professorCourseId});
			if(!professorCourseRecord) throw new Error("no professorCourseRecord exist for getFilteredStudentCourses exist");
			const professorUserProfile = await UserService.getUniqueUser({id:professorCourseRecord.professorId});
			if(!professorUserProfile) throw new Error("no user exist for getFilteredStudentCourses");
			if(!professorCourseRecord) throw new Error("no professorUserProfile exist");
			const courseRecord = await CourseService.getUniqueCourse({id:professorCourseRecord.courseId});
			if(!courseRecord) throw new Error("no courseRecord exist for getFilteredSTudentCourses");

			return {studentCourseId:record.id, professorCourse:{professorCourseId:professorCourseRecord.id,courseName:courseRecord.name,courseDescription:courseRecord.description,professorName:professorUserProfile.name}};
		}
	));



};

export const deleteStudentCourse = async function(payload:{id:string, professorCourseId:string}){
	const assignments = await AssignmentService.getFilteredAssignments({professorCourseId:payload.professorCourseId});
	const assignmentSubmissions = await Promise.all(assignments.map(assignment=>{
		return AssignmentSubmissionService.getAssignmentSubmissions({studentCourseId:payload.id,assignmentId:assignment.id});
	}));

	const flatAssignmentSubmissions = assignmentSubmissions.flat();

	//have to use prismaClient directly if using transaction because
	//each prismaClient instance in each table functions file is different
	const deleteAssignmentSubmissions = flatAssignmentSubmissions.map(assignmentSubmission=>{
		return prismaClient.assignmentSubmission.deleteMany({where:{id:assignmentSubmission.id}});
	});

	return prismaClient.$transaction([...deleteAssignmentSubmissions, prismaClient.studentCourse.deleteMany({where:{id:payload.id}})]);


};

export const deleteStudentCourseViaStudentCourseId = async function(payload: {studentCourseId:string}){
	await AssignmentSubmissionService.deleteAssignmentSubmission(payload);
	return StudentTable.deleteStudentCourse({id:payload.studentCourseId});
};