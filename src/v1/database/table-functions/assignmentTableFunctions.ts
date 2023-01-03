import { Assignment } from "@prisma/client";
import prismaClient from "../prismaClient";

export const createAssignment = async function(payload: Assignment){
	return prismaClient.assignment.create({
		data: payload
	});
};

export const getAssignments = async function(payload:{professorCourseId:string}){
	return prismaClient.assignment.findMany({
		where:payload
	});
};

export const getFilteredAssignments = async function(payload:{professorCourseId:string&Partial<Omit<Assignment,"professorCourseId">>}){
	return prismaClient.assignment.findMany({
		where:payload
	});
};

export const getUniqueAssignment = async function(payload: {id:string}){
	
	return prismaClient.assignment.findUnique({
		where: {id:payload.id}
	});
};

export const updatePdfInAssignment = async function(payload: {id:string, pdfName:string, pdfId:string}){

	return prismaClient.assignment.update({
		where: {
			id: payload.id

		},
		data: {
			pdfId: payload.pdfId,
			pdfName: payload.pdfName,
		}
	});
};

export const deleteAssignments = async function(payload: {id: string}){
	return prismaClient.assignment.delete({
		where: {id:payload.id}
	});
};

