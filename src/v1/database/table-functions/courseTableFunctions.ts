import prismaClient from "../prismaClient";
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { PrismaTypes } from "../../../CustomTypes";
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

export const getFilteredCourses = async function(payload: PrismaTypes.CourseAttributes){
	return prismaClient.course.findMany({
		where: payload
	});
};


export const createCourse = async function(payload: Course){
	return prismaClient.course.create({
		data: payload,
	});
};

