import { Prisma } from "@prisma/client";
import prismaClient from "../prismaClient";

export const createAssignmentSubmission = async function(payload: Omit<Prisma.AssignmentSubmissionCreateManyInput, "pointsEarned" | "pdfName" | "pdfId">[]){
	return prismaClient.assignmentSubmission.createMany({
		data:payload,
		skipDuplicates: true,
	});
};

export const getUniqueAssignmentSubmission = async function(payload:{id:string}){
	return prismaClient.assignmentSubmission.findUniqueOrThrow({
		where: payload,
	});
};

export const getCourseAssignmentSubmissions = async function(payload:{studentCourseId:string}){
	return prismaClient.assignmentSubmission.findMany({
		where: payload,
	});
};

export const getAssignmentSubmissions = async function(payload: {studentCourseId:string, assignmentId:string}){
	return prismaClient.assignmentSubmission.findMany({
		where: payload,
	});
};

export const updatePointsEarned = async function(payload: {pointsEarned:string, id:string}){
	return prismaClient.assignmentSubmission.update({
		where:{
			id:payload.id,
		},
		data: {
			pointsEarned: payload.pointsEarned,
		}
	});
};

export const updatePDFInAssignmentSubmission = async function(payload: {id:string, pdfId:string, pdfName:string}){
	return prismaClient.assignmentSubmission.update({
		where: {
			id:payload.id
		},
		data: {
			pdfId:payload.pdfId,
			pdfName: payload.pdfName
		}
	});
};

export const deleteAssignmentSubmission = async function(payload: {id?:string, assignmentId?:string, studentCourseId?:string}){
	return prismaClient.assignmentSubmission.deleteMany({
		where: payload
	});
};