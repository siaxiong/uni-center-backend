// import * as UserTable from "../../database/table-functions/userTableFunctions";
import { UserService } from "../services";
import * as AWS from "../AWS/Cognito/cognitoFunctions";
import { User } from "@prisma/client";

type UserCreateInputs = Omit<User,"id"|"aws_confirmed"|"enrolled">

const register = async function(payload: {userCreateInput: UserCreateInputs, password: string}){
	try {
		const aws_resp = await AWS.createAWSAccount(payload.userCreateInput.email as string,payload.password,payload.userCreateInput.name as string);
		const userRecordCreatePayload = {id: aws_resp.UserSub as string,email: payload.userCreateInput.email as string,name: payload.userCreateInput.name, role: payload.userCreateInput.role, aws_confirmed: aws_resp.UserConfirmed};
		const db_resp = await UserService.createUserRecord(userRecordCreatePayload);
		return db_resp;
	}catch(error){
		console.log(error);
		throw Error("Registration error");
	}
};

const login = async function({email,password}:{email:string, password:string}){
	const credential = await AWS.getCredential(email, password);
	const db_record = await UserService.getFilteredUsers({email});
	// await AWS.assignUserToGroup(email,db_record.role);
	return {credentials: credential,user: db_record[0]};
};

const confirm = async function(email: string, confirmationCode: string){
	await AWS.confirmAWSAccount(email, confirmationCode);
	const db_resp = await UserService.confirmAccount(email);
	return db_resp;
};

const isUserExist = async function(email: string){
	return UserService.isUserExist(email);
};

export {register, login, confirm, isUserExist};

