import { Prisma, User} from "@prisma/client";
import prismaClient from "../prismaClient";

export const createUserRecord = async function(payload: Prisma.UserCreateManyInput){
	return prismaClient.user.create({
		data: payload
	});
};
export const isUserExist = async function(payload: {email:string}){
	const data = await prismaClient.user.findMany({
		where:payload
	});
	return data.length ? true : false;
};

// NEED BOTH getUsers & getFilteredUsers !!!
export const getUsers = async function(){
	return prismaClient.user.findMany();
};
// NEED BOTH getUsers & getFilteredUsers !!!
//getFilteredUsers tell you if users with particular 
//attributes exist while getUsers just return all users
//regardless of their attributes status
export const getFilteredUsers = async function(payload: Partial<User>){
	return prismaClient.user.findMany({
		where: payload
	});
};

export const getUniqueUser = async function(payload: {id:string}){
	return prismaClient.user.findUnique({
		where:payload
	});
};

export const updateUser = async function(payload:{id:string&Partial<Omit<User, "id">>}){
	return prismaClient.user.update({
		where: {
			id: payload.id
		},
		data: payload
	});
};

