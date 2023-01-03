import  {CourseTable} from "../../database/database-functions";
import prismaClient from "../../database/prismaClient";
import {createUniqueID} from "../../database/createUniqueID";
import { Course } from "@prisma/client";
import { AssignmentService, ProfessorService, StudentCourseService } from "../services";

export const getCourses = async function(){
	return CourseTable.getCourses();
};
export const getUniqueCourse = async function(payload:{id:string}){
	return CourseTable.getUniqueCourse(payload);
};
export const getFilteredCourses = async function(payload: Partial<Course>){
	return CourseTable.getFilteredCourses(payload);
};
export const createCourse = async function(name: string, description: string){
	const id = await createUniqueID("Course");
	return CourseTable.createCourse({id,name,description});
};
export const deleteCourse = async function(id: string){

	console.log(id);

	const professorCourses = await prismaClient.professorCourse.findMany({where:{courseId:id}});
	const deleteProfessorCourses = prismaClient.professorCourse.deleteMany({where:{courseId:id}});
	const assignments = await Promise.all(professorCourses.map(professorCourse=>prismaClient.assignment.findMany({where:{professorCourseId:professorCourse.id}})));
	const deleteAssignments = (assignments.flat()).map(assignment=>prismaClient.assignment.deleteMany({where:{id:assignment.id}}));
	const studentCourses = await Promise.all(professorCourses.map(professorCourse=>prismaClient.studentCourse.findMany({where:{professorCourseId:professorCourse.id}})));
	const deleteStudentCourses = (studentCourses.flat()).map(studentCourse=>prismaClient.studentCourse.deleteMany({where:{id:studentCourse.id}}));
	const deleteAssignmentSubmissions = (studentCourses.flat()).map(studentCourse=>prismaClient.assignmentSubmission.deleteMany({where:{studentCourseId:studentCourse.id}}));

	return prismaClient.$transaction([...deleteAssignmentSubmissions,...deleteStudentCourses,...deleteAssignments,deleteProfessorCourses,prismaClient.course.deleteMany({where:{id}})]);
};