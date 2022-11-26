import  {CourseTable} from "../../database/database-functions";
import { checkEmptyValue } from "../../utils/checkDBResult";
import prismaClient from "../../database/prismaClient";


export const getAllCourses = async function(){
    return checkEmptyValue(CourseTable.getAllCourses());
}

export const getUniqueCourse = async function(id: string){
    return checkEmptyValue(CourseTable.getUniqueCourse(id));
}


export const createCourse = async function(name: string, description: string){
    return checkEmptyValue(CourseTable.createCourse(name,description));
}

export const deleteUniqueCourse = async function(id: string){
    const data = await prismaClient.$transaction([prismaClient.Professor.deleteMany({where:{courseId:id}}),prismaClient.Course.delete({where:{id}})]);
    return checkEmptyValue(data[1]);
}