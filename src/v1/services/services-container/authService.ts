// import * as UserTable from "../../database/table-functions/userTableFunctions";
import { UserService } from "../services";
import {Auth_Types, Registration} from "../../../CustomTypes";
import { auth0ManagementClient, authenticationClient } from "../Auth0/Auth0";
import axios from "axios";
import {Role} from "@prisma/client";
import {ENV_API} from "../../../EnvironmentVariables";

type newUserData = {
	_id: string,
	email_verified?: boolean,
	email: string,
	name: string,
}

export const formRegistration = async function(payload: {userCreateInput: Registration.FormCreateUserInputs, password: string}){
	let userId="";
	const roleIDs = {
		Admin: "rol_8vPTzXQGj5EJ6om4",
		Professor: "rol_z5yAj8nRZTGFLgCf"
	};

	try {
		console.log(payload);
		const signUpResponse = await axios({
			url: "https://university-center.us.auth0.com/dbconnections/signup",
			method: "POST",
			data: {
				client_id:"Emr9WsYxl8u9AlANE3lkNDSA9h8KOK6r",
				email: payload.userCreateInput.email,
				password: payload.password,
				name: payload.userCreateInput.name,
				connection: "Username-Password-Authentication",
			}
		});

		const userData: newUserData = signUpResponse.data;
		const fetchUser = await auth0ManagementClient.getUsersByEmail(userData.email);
		userId = fetchUser[0].user_id as string;

		await auth0ManagementClient.assignRolestoUser({id: userId}, {roles:[roleIDs[payload.userCreateInput.role as string as keyof typeof roleIDs]]});

		const createUserPayload = {
			id: userId,
			email: userData.email,
			name: userData.name,
			role: payload.userCreateInput.role as Role,
		};

		const db_resp = await UserService.createUserRecord(createUserPayload);
		return db_resp;
	}catch(error){
		console.log(error);
		await auth0ManagementClient.deleteUser({id:userId});
		throw Error("Form Registration Error");

	}
};

//idp = Identity Provider
export const idpRegistration = async function(payload: Registration.IdpCreateUserInputs){
	try {
		const userExist = await UserService.isUserExist(payload.email);
		if(userExist) {
			const userRecords = await UserService.getFilteredUsers({email: payload.email});
			return userRecords[0];
		}
		return  UserService.createUserRecord(payload);
		
	} catch (error) {
		console.log(error);
		throw Error("IDP Registration Error");
		
	}
};

export const login = async function({email,password}:{email:string, password:string}):Promise<Auth_Types.LoginData>{
	const responseTokens = await authenticationClient.passwordGrant({
		username:email,
		password:password,
		realm: "Username-Password-Authentication",
		audience: ENV_API.Audience,
		scope: "offline_access openid"
	});

	const tokens = {
		idToken: responseTokens.id_token,
		accessToken: responseTokens.access_token,
		refreshToken: responseTokens.refresh_token,
		expiresIn: responseTokens.expires_in,
		tokenType: responseTokens.token_type,
	};
	const userRecord = await UserService.getFilteredUsers({email});
	return {userRecord: userRecord[0], tokens} as Auth_Types.LoginData;
};

export const isUserExist = async function(email: string){
	return UserService.isUserExist(email);
};


