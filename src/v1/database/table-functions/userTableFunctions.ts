import { Prisma} from "@prisma/client";
import prismaClient from "../prismaClient";
import {PrismaTypes} from "../../../CustomTypes";

export const createUserRecord = async function(payload: Prisma.UserCreateManyInput){
	return prismaClient.user.create({
		data: payload
	});
};

export const isUserExist = async function(email:string){
	const data = await prismaClient.user.findMany({
		where:{
			email
		}
	});
	return data.length ? true : false;
};

// NEED BOTH getUsers & getFilteredUsers !!!
export const getUsers = async function(){
	console.log("****DB getUsers()*******");
	return prismaClient.user.findMany();
};
// NEED BOTH getUsers & getFilteredUsers !!!
//getFilteredUsers tell you if users with particular 
//attributes exist while getUsers just return all users
//regardless of their attributes status
export const getFilteredUsers = async function(user: PrismaTypes.UserAttributes){

	return prismaClient.user.findMany({
		where: user
	});
};

export const getUniqueUser = async function(id: string){
	return prismaClient.user.findUnique({
		where:{
			id
		}
	});
};

export const updateUser = async function(payload: PrismaTypes.UserAttributes){
	return prismaClient.user.update({
		where: {
			id: payload.id
		},
		data: payload
	});
};

