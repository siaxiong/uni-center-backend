import { Assignment } from "@prisma/client";
import prismaClient from "../prismaClient";

export const createAssignment = async function(payload: Assignment){
	return prismaClient.assignment.create({
		data: payload
	});
};

export const getFilteredAssignments = async function(payload: {id:string, professorId: string}){
	return prismaClient.assignment.findMany({
		where: payload,
	});
};

export const deleteAssignments = async function(payload: {id:string}){
	return prismaClient.assignment.delete({
		where:payload,
	});
};