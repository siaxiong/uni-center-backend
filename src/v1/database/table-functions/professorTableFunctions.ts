import { Prisma } from "@prisma/client";
import prismaClient from "../prismaClient";
import {PrismaTypes} from "../../../CustomTypes";


export const getProfessors = async function(){
	return prismaClient.professor.findMany({});
};

export const getFilteredProfessors = async function(payload: PrismaTypes.ProfessorAttributes){
	return prismaClient.professor.findMany({
		where: payload
	});
};

export const getDistinctCourses = async function(){
	return prismaClient.professor.findMany({
		distinct: ["courseId"],
		select: {courseId: true}
	});
};

export const createProfessorRecord = async function(payload: Prisma.ProfessorCreateManyInput){
	return prismaClient.professor.create({
		data: payload
	});
};

export const deleteProfessors = function(payload: PrismaTypes.ProfessorAttributes){
	return prismaClient.professor.deleteMany({
		where: payload
	});
};
