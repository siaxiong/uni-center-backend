import { Application, NextFunction, Request, Response} from "express";
import {Prisma} from "@prisma/client";

type ExpressFunction = (req: Request, res: Response, next: NextFunction)=>void

const catchError = (fn: ExpressFunction)=>(req:Request,res:Response,next:NextFunction)=>Promise.resolve(fn(req,res,next)).catch((error:Error)=>{

    console.log("🚀 ~ file: catchError.ts ~ line 20 ~ error", error)

    if(error instanceof Prisma.PrismaClientKnownRequestError){
        res.status(400).json({Error:{errorCode: error.code, msg: error.meta}})
    }else {
        res.status(400).json({Error:{name:error.name, msg:error.message}})

    }

})

// const catchError = async (fn: ExpressFunction)=>{
//     try {
//      await fn;
        
//     } catch (error) {
//         console.log(fn);
//     }
// }

export {catchError}