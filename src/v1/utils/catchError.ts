import { NextFunction, Request, Response} from "express";
import {Prisma} from "@prisma/client";

type ExpressFunction = (req: Request, res: Response, next: NextFunction)=>void

const catchError = (fn: ExpressFunction)=>{
	(req:Request,res:Response,next:NextFunction)=>Promise.resolve(fn(req,res,next)).catch((error:Error)=>{

		console.log("*******ERROR START***********");
		console.log(error);
		console.log("*******ERROR END*************");

		if(error instanceof Prisma.PrismaClientKnownRequestError){
			res.status(400).json({Error:{errorCode: error.code, msg: error.meta}});
		}else {
			res.status(400).json({Error:{name:error.name, msg:error.message}});

		}

	});};


export {catchError};