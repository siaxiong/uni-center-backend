import prismaClient from "../prismaClient";
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { PrismaTypes } from "../../../CustomTypes";
import { Course } from "@prisma/client";

const getCourses = async function(){
	return prismaClient.course.findMany({
		orderBy: [
			{
				name: "asc"
			}
		]
	});
};

const getFilteredCourses = async function(payload: PrismaTypes.CourseAttributes){
	return prismaClient.course.findMany({
		where: payload
	});
};


const createCourse = async function(payload: Course){
	return prismaClient.course.create({
		data: payload,
	});
};

//DeleteUniqueCourse and DeleteCourse can be combine into one using optional properties in a obj.

export {getCourses, getFilteredCourses, createCourse};