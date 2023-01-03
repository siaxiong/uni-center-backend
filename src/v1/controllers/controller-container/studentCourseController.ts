import { StudentCourse } from "@prisma/client";
import {Response, Request} from "express";
import { StudentCourseService } from "../../services/services";



export const createStudentCourse = async function(req:Request, res:Response){
	const {userId,professorCourseId}:{userId:string,professorCourseId:string} = req.body;
	const data = await StudentCourseService.createStudentCourse({studentId:userId,professorCourseId});
	res.json(data);
};

export const getStudentCourses = async function(req:Request, res:Response){
	const {userId} = req.query as {userId:string};

	// let data:StudentCourse[];
	// if(typeof userId === "string") 
	const data = await StudentCourseService.getFilteredStudentCourses({studentId:userId});
	// else data = await StudentCourseService.getStudentCourses();

	res.json(data);
};

export const deleteStudentCourse = async function(req:Request, res:Response){
	const studentCourseId = req.params.studentCourseId;
	const data = await StudentCourseService.deleteStudentCourseViaStudentCourseId({studentCourseId});
	res.json(data);

};


