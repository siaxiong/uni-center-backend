import express, { Request, Response } from "express";
import { AuthService } from "../../services/services";
import { catchError } from "../../utils/catchError";

const register = catchError(
    async function(req: Request, resp: Response){
        const {email, password, name, role} = req.body;
        
        const data = await AuthService.register({email,password,name,role})
        resp.json(data);
    }
) 

const login = catchError(
    async function(req: Request, resp: Response){
        const {email, password} = req.body;

        const data = await AuthService.login({email,password});
        resp.json(data);
    }
)



const confirm = catchError(
    async function(req: Request, resp: Response){
        const {email, confirmationCode} = req.body;

        const data = await AuthService.confirm(email,confirmationCode);
        resp.json(data);
    }
)

const userExist = catchError(
    async function(req: Request, resp: Response){
        console.log("/userExist")
        const {email} = req.query;
        const bool = await AuthService.isUserExist(email as string);
        resp.json({userEmail:email,userExist:bool});
    }
)

export {register, login, confirm, userExist};