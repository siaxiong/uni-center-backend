import {ProfessorTable} from "../../database/database-functions";
import { UserService } from "../services";
import { checkEmptyValue } from "../../utils/checkDBResult";
import { Professor} from "@prisma/client";
import { PrismaTypes } from "../../../myTypes";
// eslint-disable-next-line @typescript-eslint/no-var-requires
import createUniqueID from "../../database/createUniqueID";

export const getProfessors = async function(){
	console.log("***********getProfessor SERVICE ********");
	return checkEmptyValue(ProfessorTable.getProfessors());
};

export const getFilteredProfessors = async function(payload: PrismaTypes.ProfessorAttributes){
	return checkEmptyValue(ProfessorTable.getFilteredProfessors(payload));
};

export const getDistinctCourses = async function(){
	return checkEmptyValue(ProfessorTable.getDistinctCourses());
};

type CreateProfessorType = Omit<Professor, "id">;
export const createProfessorRecord = async function(payload: CreateProfessorType){
	const userRecord = (await UserService.getFilteredUsers({id: payload.userId}))[0];
	const id = await createUniqueID("Professor");
	if(!userRecord.aws_confirmed) throw new Error("User account is not confirmed yet!");
	if(!(userRecord.enrolled === "ACCEPTED")) throw new Error("User's enrollment is not accepted yet!");
	
	return checkEmptyValue(ProfessorTable.createProfessorRecord(Object.assign({id},payload)));
};

export const deleteProfessors = async function(payload: PrismaTypes.ProfessorAttributes){
	return checkEmptyValue(ProfessorTable.deleteProfessors(payload));
};


