import { Response, Request } from "express";
import { Readable } from "node:stream";
import { AssignmentSubmissionService, AssignmentService } from "../../services/services";


export const getCourseAssignmentSubmissions = async function(req: Request, res: Response){
	const studentCourseId = req.params.studentCourseId as string;
	const assignmentSubmissions = await AssignmentSubmissionService.getCourseAssignmentSubmissions({studentCourseId});
	const data = await Promise.all(assignmentSubmissions.map(async record=>{
		const assignment = await AssignmentService.getUniqueAssignment({id:record.assignmentId});
		return {assignment, assignmentSubmission: record};
	}));

	res.json(data);
};

export const updatePDFInAssignmentSubmission = async function(req: Request, res: Response){
	
	//only need the assignment submission id for identification
	const assignmentSubmissionId = req.params.assignmentSubmissionId;
	const {pdfId, pdfName} = req.query as {pdfId:string, pdfName:string};

	const data = await AssignmentSubmissionService.updatePDFInAssignmentSubmission({id:assignmentSubmissionId,pdfId,pdfName});
	res.json(data);
};

export const getAssignmentSubmissionPDF = async function(req:Request, res:Response){
	const assignmentSubmissionId = req.params.assignmentSubmissionId;
	const data = await AssignmentSubmissionService.getAssignmentSubmissionPDF({id:assignmentSubmissionId});
	(data.Body as Readable).pipe(res);

};