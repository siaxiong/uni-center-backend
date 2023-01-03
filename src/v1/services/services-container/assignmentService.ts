import { Assignment } from "@prisma/client";
import { AssignmentTable } from "../../database/database-functions";
import { createUniqueID } from "../../database/createUniqueID";
import { s3GetPDF, s3DeletePDF } from "../AWS/S3/s3Functions";
import { AssignmentSubmissionService } from "../services";


/** READ ME !!!!!***/
//These are assignments only for Professor to operate CRUD on

export const createAssignment = async function(payload: Omit<Assignment, "id">){
	const id = await createUniqueID("Assignment");
	const assignment =  await AssignmentTable.createAssignment({id, ...payload});

	await AssignmentSubmissionService.createAssignmentSubmission({
		assignmentId:assignment.id,
		professorCourseId:payload.professorCourseId
	});

	return assignment;

};

export const getUniqueAssignment = async function(payload: {id:string}){
	return AssignmentTable.getUniqueAssignment(payload);
};

export const getAssignments = async function(payload: {professorCourseId:string}){
	return AssignmentTable.getAssignments(payload);
};

export const getFilteredAssignments = async function(payload:{professorCourseId:string&Partial<Omit<Assignment, "professorCourseId">>}){
	return AssignmentTable.getFilteredAssignments(payload);
};

export const getAssignmentPDF = async function(payload:{id:string}){
	const assignmentRecord = await AssignmentTable.getUniqueAssignment(payload);
	if(!assignmentRecord) throw new Error("no pdf found");
	return s3GetPDF({VersionId:assignmentRecord.pdfId, Key:assignmentRecord.pdfName});
};


export const updatePdfInAssignment = async function(payload: {id:string,pdfId:string, pdfName:string}){
	const assignmentRecord = await AssignmentTable.getUniqueAssignment({id:payload.id});
	if(!assignmentRecord) throw new Error("no assignment found. possible data corruption");
	await s3DeletePDF({VersionId:assignmentRecord.pdfId, Key:assignmentRecord.pdfName});
	
	return AssignmentTable.updatePdfInAssignment(payload);
};

export const deleteAssignments = async function(payload: {id:string}){
	console.log("🚀 ~ file: assignmentService.ts:52 ~ deleteAssignments ~ payload", payload);
	
	const assignmentRecord = await AssignmentTable.getUniqueAssignment(payload);
	await AssignmentSubmissionService.deleteAssignmentSubmission({assignmentId:payload.id});
	if(!assignmentRecord) throw new Error("no assignment found. possible data corruption");
	await s3DeletePDF({VersionId: assignmentRecord.pdfId, Key: assignmentRecord.pdfName});

	return AssignmentTable.deleteAssignments(payload);
};