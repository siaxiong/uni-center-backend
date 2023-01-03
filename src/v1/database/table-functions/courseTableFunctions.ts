import prismaClient from "../prismaClient";
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { Course } from "@prisma/client";

export const getCourses = async function(){
	return prismaClient.course.findMany({
		orderBy: [
			{
				name: "asc"
			}
		]
	});
};

export const getUniqueCourse = async function(payload:{id:string}){
	return prismaClient.course.findUnique({
		where: payload
	});
};

export const getFilteredCourses = async function(payload: Partial<Course>){
	return prismaClient.course.findMany({
		where: payload
	});
};


export const createCourse = async function(payload: Course){
	return prismaClient.course.create({
		data: payload,
	});
};

