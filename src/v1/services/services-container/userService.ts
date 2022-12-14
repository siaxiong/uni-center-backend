import { UserTable} from "../../database/database-functions";
import { checkEmptyValue } from "../../utils/checkDBResult";
import prismaClient from "../../database/prismaClient";
import { Prisma } from "@prisma/client";
import {PrismaTypes} from "../../../CustomTypes";
import createUniqueID from "../../database/createUniqueID";
import { auth0ManagementClient } from "../Auth0/Auth0";
import { ENV_API } from "../../../EnvironmentVariables";
import { UserService } from "../services";


export const createUserRecord = async function(userRecordPayload:  Prisma.UserCreateManyInput, id?:string){
	if(!id) id = await createUniqueID("User"); 
	return UserTable.createUserRecord(Object.assign({id},userRecordPayload));
};

export const isUserExist = async function(email:string){
	return UserTable.isUserExist(email);
};

export const getUsers = async function(){
	return UserTable.getUsers();
};

export const getFilteredUsers = async function(payload: PrismaTypes.UserAttributes){
	return UserTable.getFilteredUsers(payload);
};
export const updateUser = async function(payload: PrismaTypes.UserAttributes){
	// if(payload.role && payload.id) {
	// 	if(payload.role === "Admin") auth0ManagementClient.assignRolestoUser({id: payload.id},{roles:[ENV_API.AdminRoleID]});
	// 	if(payload.role === "Professor") auth0ManagementClient.assignRolestoUser({id: payload.id},{roles:[ENV_API.ProfessorRoleID]});
	// 	if(payload.role === "Student") auth0ManagementClient.assignRolestoUser({id: payload.id},{roles:[ENV_API.StudentRoleID]});
	// }

	if(payload.enrollmentStatus === "Accepted" && payload.id){
		const userRecord = await UserService.getFilteredUsers({id:payload.id});
		const user = userRecord[0];
		if(user.role === "Admin") auth0ManagementClient.assignRolestoUser({id: payload.id},{roles:[ENV_API.AdminRoleID]});
		if(user.role === "Professor") auth0ManagementClient.assignRolestoUser({id: payload.id},{roles:[ENV_API.ProfessorRoleID]});
		if(user.role === "Student") auth0ManagementClient.assignRolestoUser({id: payload.id},{roles:[ENV_API.StudentRoleID]});
	}

	return UserTable.updateUser(payload);
};

export const deleteUniqueUser = async function(id: string ){
	//it seems like it needs to use the same "prismaClient" instantiation
	//thus, importing from diff module would use diff instantiation cause transaction to not work
	await auth0ManagementClient.deleteUser({id});
	const data = prismaClient.$transaction([prismaClient.professor.deleteMany({where:{userId:id}}), prismaClient.user.delete({where:{id}})]);

	//i dont need the first object that $transaction returns
	return data;
};
