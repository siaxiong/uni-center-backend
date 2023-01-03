import { Request, Response } from "express";

import * as Auth from "./controller-container/authController";
import * as Course from "./controller-container/courseController";
import * as UserCourse from "./controller-container/userController";
import * as ProfessorCourse from "./controller-container/professorController";
import * as Assignment from "./controller-container/assignmentController";
import * as StudentCourse from "./controller-container/studentCourseController";
import * as AssignmentSubmission from "./controller-container/assignmentSubmissionController";


const appendHandleError = function(router: Record<string,(req:Request, res:Response)=>Promise<unknown>>):Record<string,(req:Request,res:Response)=>void>{
	const objArr = Object.entries(router);

	const newObjArr = objArr.map(item=>{
		function HandleError(req:Request, res:Response){
			item[1](req,res).catch(e=>{
				console.log("&&&&&");
				console.log(e);
				console.log("&&&&&");

				res.status(400).json({Error:{name:e.name, msg:e.message}});

			});
		}	
		return [item[0], HandleError];
	});

	return Object.fromEntries(newObjArr);
};
console.log(Assignment);

export const AuthController = appendHandleError(Auth);
export const CourseController = appendHandleError(Course);
export const UserCourseController = appendHandleError(UserCourse);
export const ProfessorCourseController = appendHandleError(ProfessorCourse);
export const AssignmentController = appendHandleError(Assignment);
export const StudentCourseController = appendHandleError(StudentCourse);
export const AssignmentSubmissionController = appendHandleError(AssignmentSubmission);
