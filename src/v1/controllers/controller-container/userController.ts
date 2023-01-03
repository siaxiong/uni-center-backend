import { UserService } from "../../services/services";
import {EnrollmentStatus, User} from "@prisma/client";
import {Request, Response} from "express";


export const getUsers = async function(req:Request, res:Response){
	const payload: Partial<User> = req.query; 
	let data: User[] | [];

	if(payload) data = await UserService.getFilteredUsers(payload);
	else data = await UserService.getUsers();

	res.json(data);
};

export const getFilteredUsers = async function(req:Request,res:Response){
	const payload: Partial<User> = req.query; 

	const data = await UserService.getFilteredUsers(payload);
	res.json(data);
};

export const updateUser = async function(req:Request,res:Response){
	const id = req.params.userId;
	const payload: {enrollmentStatus:EnrollmentStatus&Partial<Omit<User,"id" | "enrollmentStatus">>} = req.body;
		
	const data = await UserService.updateUser({id,...payload});
	res.json(data);

};

export const deleteUser = async function(req:Request,res:Response){
	const id = req.params.userId;

	const data = await UserService.deleteUser({id});
	res.json(data);
};
