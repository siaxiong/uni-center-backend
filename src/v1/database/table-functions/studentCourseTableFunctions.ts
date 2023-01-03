
import { StudentCourse } from "@prisma/client";
import prismaClient from "../prismaClient";


export const createUserCourse = async function(payload: StudentCourse){
	return prismaClient.studentCourse.create({data:payload});
};

export const getStudentCourses = async function(){
	return prismaClient.studentCourse.findMany({});
};

export const getFilteredStudentCourses = async function(payload: Partial<StudentCourse>){
	return prismaClient.studentCourse.findMany({
		where: payload
	});
};

export const deleteStudentCourse = async function(payload:{id?:string, professorCourseId?:string}){
	return prismaClient.studentCourse.deleteMany({
		where:payload,
	});

};