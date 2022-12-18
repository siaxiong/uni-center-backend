import { UserService } from "../../services/services";
import {User} from "@prisma/client";
import { PrismaTypes } from "../../../CustomTypes";
import {Request, Response} from "express";

type UserAttributes = Partial<User>

export const getUsers = async function(req:Request, res:Response){
	const payload: UserAttributes = req.query; 
	console.log("🚀 ~ file: userController.ts:11 ~ function ~ payload", payload);
	let data: User[] | [];

	if(payload) data = await UserService.getFilteredUsers(payload as UserAttributes);
	else data = await UserService.getUsers();

	res.json(data);
};

export const getFilteredUsers = async function(req:Request,res:Response){
	const payload: UserAttributes = req.query;

	const data = await UserService.getFilteredUsers(payload);
	res.json(data);
};

export const updateUser = async function(req:Request,res:Response){
	const id = req.params.userId;
	const payload: PrismaTypes.UserAttributes = req.body;
		
	if(payload){
		payload.id = id;
		const data = await UserService.updateUser(payload);
		res.json(data);
	}else{
		throw new Error("Missing attributes to update!");
	}
};

export const deleteUniqueUser = async function(req:Request,res:Response){
	const id = req.params.userId;

	const data = await UserService.deleteUniqueUser(id);
	res.json(data);
};
