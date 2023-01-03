import { Prisma, ProfessorCourse } from "@prisma/client";
import prismaClient from "../prismaClient";

export const getProfessorCourses = async function(){
	return prismaClient.professorCourse.findMany({
		include: {
			course: true,
			user: true,
		}
	});
};

export const getUniqueProfessorCourse = async function(payload:{id:string}){
	return prismaClient.professorCourse.findUnique({
		where: payload,
	});
};

export const getFilteredProfessorCourses = async function(payload: Partial<ProfessorCourse>){
	return prismaClient.professorCourse.findMany({
		where: payload,
		include: {
			course: true,
			user: true,
		}
	});
};

export const getDistinctCourse = async function(){
	return prismaClient.professorCourse.findMany({
		distinct: ["courseId"],
		select: {courseId: true}
	});
};

export const createProfessorCourse = async function(payload: Prisma.ProfessorCourseCreateManyInput){
	return prismaClient.professorCourse.create({
		data: payload
	});
};

export const deleteProfessorCourse = function(payload: {id:string}){
	return prismaClient.professorCourse.delete({
		where: payload
	});
};
