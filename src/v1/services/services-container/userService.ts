import { UserTable} from "../../database/database-functions";
import { checkEmptyValue } from "../../utils/checkDBResult";
import prismaClient from "../../database/prismaClient";
import { Prisma } from "@prisma/client";
import {PrismaTypes} from "../../../myTypes";
import createUniqueID from "../../database/createUniqueID";


export const createUserRecord = async function(userRecordPayload: Prisma.UserCreateInput){

	const id = await createUniqueID("User");
	return checkEmptyValue(UserTable.createUserRecord(Object.assign({id},userRecordPayload)));
};

export const confirmAccount = async function(email: string){
	return checkEmptyValue(UserTable.confirmAccount(email));
};

export const isUserExist = async function(email:string){
	// return checkEmptyValue(UserTable.isUserExist(email));
	return UserTable.isUserExist(email);
};

export const getUsers = async function(){
	return checkEmptyValue(UserTable.getUsers());
};

export const getFilteredUsers = async function(payload: PrismaTypes.UserAttributes){
	return checkEmptyValue(UserTable.getFilteredUsers(payload));
};
export const updateUser = async function(payload: PrismaTypes.UserAttributes){
	return checkEmptyValue(UserTable.updateUser(payload));
};

export const deleteUniqueUser = async function(id: string ){
	//it seems like it needs to use the same "prismaClient" instantiation
	//thus, importorting from diff module would use diff instantiation cause transaction to not work
	const data = prismaClient.$transaction([prismaClient.professor.deleteMany({where:{userId:id}}), prismaClient.user.delete({where:{id}})]);
	console.log("🚀 ~ file: userService.ts ~ line 52 ~ deleteUniqueUser ~ data", data);
	//i dont need the first object that $transaction returns
	return checkEmptyValue(data);
};
