import prismaClient from "../prismaClient";
import {createUniqueID} from "../uniqueID"


type ProfessorRecord = {
    userId?: string
    courseId?: string
}

const getAllProfessors = async function(){
    return prismaClient.Professor.findMany();
}

const getUniqueProfessor = async function(id:string){
    return prismaClient.Professor.findUnique({
        where: {
            id
        }
    })
}

const getFilteredProfessors = async function(payload: ProfessorRecord){
    return prismaClient.Professor.findMany({
        where: payload
    })
}

const getDistinctCourses = async function(){
    return prismaClient.Professor.findMany({
        distinct: ["courseId"],
        select: {courseId: true}
    })
}

const createProfessorRecord = async function(payload: ProfessorRecord){
    const id = await createUniqueID("Professor");
    return prismaClient.Professor.create({
        data: {
            id,
            userId: payload.userId,
            courseId: payload.courseId
        }
    })
}

const deleteUniqueProfessor = async function(id: string){
    return prismaClient.Professor.delete({
        where: {
            id
        }
    })
}

const deleteManyProfessors = function(payload: ProfessorRecord){
    return prismaClient.Professor.deleteMany({
        where: payload
    })
}


export {getAllProfessors, getUniqueProfessor, getFilteredProfessors, getDistinctCourses}
export {createProfessorRecord}
export {deleteUniqueProfessor, deleteManyProfessors}