import prismaClient from "../prismaClient";
import { createUniqueID } from "../uniqueID";
import {Prisma} from "@prisma/client";


type CourseRecord = {
    name?: string,
    description?: string

}

const getAllCourses = async function(){
    return prismaClient.Course.findMany({
        orderBy: [
            {
                name: "asc"
            }
        ]
    });
}

const getUniqueCourse = async function(id: string){
    return prismaClient.Course.findUnique({
        where: {
            id
        }
    })
}


const createCourse = async function(name: string, description: string){
    const id = await createUniqueID("Course");
    
    const resp = await prismaClient.Course.findMany({
        where: {
            name
        }
    });

    if(resp.length <= 0){
        const data = await prismaClient.Course.create({
            data:{
                id,
                name,
                description
            }
        })
         return data;
    }else {
        throw new Error(`A course with the name ${name} already existed!`)
    }
}

// const deleteUniqueCourse = async function(id: string){
//     return prismaClient.Course.delete({
//         where: {
//             id
//         }
//     })
// }

export {getAllCourses, getUniqueCourse, createCourse}