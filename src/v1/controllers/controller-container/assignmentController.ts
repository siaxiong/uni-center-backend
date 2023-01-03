import { Response, Request } from "express";
import { Assignment } from "@prisma/client";
import { AssignmentService } from "../../services/services";
import { Readable } from "stream";


export const createAssignment = async function(req:Request, res:Response){
	const professorCourseId = req.params.professorCourseId;

	const data = req.query as unknown as Omit<Assignment, "id" | "professorCourseId"> ;
	const record = await AssignmentService.createAssignment({professorCourseId,...data});
	res.json(record);
};

export const getAssignments = async function(req:Request, res:Response){
	const professorCourseId = req.params.professorCourseId;
	const record = await AssignmentService.getAssignments({professorCourseId});
	res.json(record);
};

export const getAssignmentPDF = async function(req: Request, res:Response){
	const id = req.params.assignmentId;
	const data = await AssignmentService.getAssignmentPDF({id});
	if(!data.Body) throw new Error("unable to get pdf");
	(data.Body as Readable).pipe(res);

};
// 
export const updatePdfInAssignment = async function(req: Request, res:Response){
	const id = req.params.assignmentId;
	const {pdfId, pdfName} = req.query as {pdfId:string, pdfName:string};
	const record = await AssignmentService.updatePdfInAssignment({pdfId,pdfName,id});
	res.json(record);
};

export const deleteAssignment = async function(req: Request, res:Response){
	const id = req.params.assignmentId;
	const data = await AssignmentService.deleteAssignments({id});
	res.json(data);
};