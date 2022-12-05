import { Prisma } from "@prisma/client";
import prismaClient from "../prismaClient";
import {PrismaTypes} from "../../../myTypes";


const getProfessors = async function(){
	console.log("*********getProfessors()**********");
	return prismaClient.professor.findMany({});
};

const getFilteredProfessors = async function(payload: PrismaTypes.ProfessorAttributes){
	return prismaClient.professor.findMany({
		where: payload
	});
};

const getDistinctCourses = async function(){
	return prismaClient.professor.findMany({
		distinct: ["courseId"],
		select: {courseId: true}
	});
};

const createProfessorRecord = async function(payload: Prisma.ProfessorCreateManyInput){
	return prismaClient.professor.create({
		data: payload
	});
};

const deleteProfessors = function(payload: PrismaTypes.ProfessorAttributes){
	return prismaClient.professor.deleteMany({
		where: payload
	});
};


export {getProfessors, getFilteredProfessors, getDistinctCourses};
export {createProfessorRecord};
export {deleteProfessors};