import * as Auth from "./controller-container/authController";
import * as Course from "./controller-container/courseController";
import * as User from "./controller-container/userController";
import * as Professor from "./controller-container/professorController";
import { Request, Response } from "express";


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

// export const AuthController = Object.fromEntries(newObjArr);
export const AuthController = appendHandleError(Auth);
export const CourseController = appendHandleError(Course);
export const UserController = appendHandleError(User);
export const ProfessorController = appendHandleError(Professor);

