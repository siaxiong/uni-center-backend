import { ProfessorService } from "../../services/services";
import {Request, Response} from "express";


export const getProfessorCourses = async function(req:Request, res:Response){
	//the query can be undefined because Admin users will fetch all courses
	//taught by all professors. Professors will only query courses they are teaching so they need the userId query.
	const {userId, id} = req.query as {userId?:string, id?: string};
	console.log("🚀 ~ file: professorController.ts:9 ~ getProfessorCourses ~ userId", userId);
	console.log("🚀 ~ file: professorController.ts:9 ~ getProfessorCourses ~ id", id);
	const data = await ProfessorService.getProfessorCourses(id ? {id} : {professorId: userId});
	console.log("🚀 ~ file: professorController.ts:10 ~ getProfessorCourses ~ data", data);
	res.json(data);
};


export const assignProfessorToCourse = async function(req:Request, res:Response){
	const {userId, courseId} : {userId: string, courseId: string} = req.body;
	const data = await ProfessorService.createProfessorCourse({professorId:userId, courseId});
	res.json(data);

};

export const deleteProfessorCourse = async function(req:Request, res:Response){
	const professorCourseId = req.params.professorCourseId;
	const data = await ProfessorService.deleteProfessorCourse({id: professorCourseId});
	res.json(data);
};
