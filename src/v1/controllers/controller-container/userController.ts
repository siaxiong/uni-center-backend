import { catchError } from "../../utils/catchError";
import { UserService } from "../../services/services";
import {User} from "@prisma/client";
import { PrismaTypes } from "../../../CustomTypes";

type UserAttributes = Partial<User>

export const getUsers = catchError(
	async function(req, res){
		const payload: UserAttributes = req.query; 
		let data: User[] | [];

		if(payload) data = await UserService.getFilteredUsers(payload as UserAttributes);
		else data = await UserService.getUsers();

		res.json(data);
	}
);

export const getFilteredUsers = catchError(
	async function(req,res){
		const payload: UserAttributes = req.query;

		const data = await UserService.getFilteredUsers(payload);
		res.json(data);
	}
);

export const updateUser = catchError(
	async function(req,res){
		const id = req.params.userId;
		const payload: PrismaTypes.UserAttributes = req.body;
		
		if(payload){
			payload.id = id;
			const data = await UserService.updateUser(payload);
			console.log("🚀 ~ file: userController.ts ~ line 76 ~ data", data);
			res.json(data);
		}else{
			throw new Error("Missing attributes to update!");
		}
	}
);

export const deleteUniqueUser = catchError(
	async function(req,res){
		const id = req.params.userId;

		const data = await UserService.deleteUniqueUser(id);
		res.json(data);
	}
);
