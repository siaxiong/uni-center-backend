import { AssignmentSubmission } from "@prisma/client";
import { AssignmentSubmissionTable, StudentTable } from "../../database/database-functions";
import { createUniqueID } from "../../database/createUniqueID";
import { AssignmentService, StudentCourseService } from "../services";
import { s3GetPDF } from "../AWS/S3/s3Functions";


//Find a way to use StudentCourseService instead of using StudentTable directly
export const createAssignmentSubmission = async function(payload: {assignmentId:string, professorCourseId:string }){
	const allStudentsTakingTheCourse = await StudentTable.getFilteredStudentCourses({professorCourseId:payload.professorCourseId});	
	const assignmentSubmissionArray = await Promise.all(allStudentsTakingTheCourse.map(async student=>{
		const id = await createUniqueID("AssignmentSubmission");
		return {
			id,
			studentCourseId: student.id,
			assignmentId:payload.assignmentId,
		};
	}));

	return AssignmentSubmissionTable.createAssignmentSubmission(assignmentSubmissionArray);
};

export const getCourseAssignmentSubmissions = async function(payload: {studentCourseId: string}){
	return AssignmentSubmissionTable.getCourseAssignmentSubmissions(payload);
};

export const getAssignmentSubmissions = async function(payload: {studentCourseId:string, assignmentId:string}){
	return AssignmentSubmissionTable.getAssignmentSubmissions(payload);
};

export const getAssignmentSubmissionPDF = async function(payload: {id:string}){
	const assignmentSubmission = await AssignmentSubmissionTable.getUniqueAssignmentSubmission(payload);
	if(assignmentSubmission.pdfId&&assignmentSubmission.pdfName) return s3GetPDF({VersionId:assignmentSubmission.pdfId, Key:assignmentSubmission.pdfName});
	throw new Error("No assigment submission pdf");
};

export const updatePointsEarned = async function(payload: {pointsEarned:string, id:string}){
	return AssignmentSubmissionTable.updatePointsEarned(payload);
};

export const updatePDFInAssignmentSubmission = async function(payload: {id:string, pdfId:string, pdfName:string}){
	return AssignmentSubmissionTable.updatePDFInAssignmentSubmission(payload);
};

export const deleteAssignmentSubmission = async function(payload: {id?:string, assignmentId?:string, studentCourseId?:string}){
	return AssignmentSubmissionTable.deleteAssignmentSubmission(payload);
};