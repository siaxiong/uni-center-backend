import { check } from "express-validator";
import {ProfessorTable} from "../../database/database-functions";
import { UserService } from "../services";
import { checkEmptyValue } from "../../utils/checkDBResult";

type ProfessorRecord = {
    id?: string
    userId?: string
    courseId?: string
}


export const getAllProfessors = async function(){
    return checkEmptyValue(ProfessorTable.getAllProfessors());
}

export const getUniqueProfessor = async function(id: string){
    return checkEmptyValue(ProfessorTable.getUniqueProfessor(id));
}

export const getFilteredProfessors = async function(payload: ProfessorRecord){
    return checkEmptyValue(ProfessorTable.getFilteredProfessors(payload));
}

export const getDistinctCourses = async function(){
    return checkEmptyValue(ProfessorTable.getDistinctCourses());
}

export const createProfessorRecord = async function(payload: ProfessorRecord){
    const userRecord = await UserService.getUniqueUser(payload.userId as string);
    if(!userRecord.aws_confirmed) throw new Error("User account is not confirmed yet!");
    if(!(userRecord.enrolled === "ACCEPTED")) throw new Error("User's enrollment is not accepted yet!")
    return checkEmptyValue(ProfessorTable.createProfessorRecord(payload))

}

export const deleteUniqueProfessor = async function(id: string){
    return checkEmptyValue(ProfessorTable.deleteUniqueProfessor(id));
}

export const deleteManyProfessors = async function(payload: ProfessorRecord){
    return checkEmptyValue(ProfessorTable.deleteManyProfessors(payload))
}


// //GET
// export {getAllProfessors,getFilteredProfessors,getUniqueProfessor,getDistinctCourses}

// //DELETE
// export {}