import {ProfessorTable} from "../../database/database-functions";
import { UserService } from "../services";
import { Professor} from "@prisma/client";
import { PrismaTypes } from "../../../CustomTypes";
// eslint-disable-next-line @typescript-eslint/no-var-requires
import createUniqueID from "../../database/createUniqueID";

export const getProfessors = async function(){
	return ProfessorTable.getProfessors();
};

export const getFilteredProfessors = async function(payload: PrismaTypes.ProfessorAttributes){
	return ProfessorTable.getFilteredProfessors(payload);
};

export const getDistinctCourses = async function(){
	return ProfessorTable.getDistinctCourses();
};

type CreateProfessorType = Omit<Professor, "id">;
export const createProfessorRecord = async function(payload: CreateProfessorType){
	const userRecord = (await UserService.getFilteredUsers({id: payload.userId}))[0];
	const id = await createUniqueID("Professor");
	if(!(userRecord.enrollmentStatus === "Accepted")) throw new Error("User's enrollment is not accepted yet!");
	
	return ProfessorTable.createProfessorRecord(Object.assign({id},payload));
};

export const deleteProfessors = async function(payload: PrismaTypes.ProfessorAttributes){
	return ProfessorTable.deleteProfessors(payload);
};


