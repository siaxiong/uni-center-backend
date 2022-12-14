import  {CourseTable} from "../../database/database-functions";
import { checkEmptyValue } from "../../utils/checkDBResult";
import prismaClient from "../../database/prismaClient";
import createUniqueID from "../../database/createUniqueID";
import { PrismaTypes } from "../../../CustomTypes";


export const getCourses = async function(){
	return CourseTable.getCourses();
};

export const getFilteredCourses = async function(payload: PrismaTypes.CourseAttributes){
	return CourseTable.getFilteredCourses(payload);
};

export const createCourse = async function(name: string, description: string){
	const id = await createUniqueID("Course");
	return CourseTable.createCourse({id,name,description});
};

export const deleteUniqueCourse = async function(id: string){
	return prismaClient.$transaction([prismaClient.professor.deleteMany({where:{courseId:id}}),prismaClient.course.delete({where:{id}})]);
};