// import * as UserTable from "../../database/table-functions/userTableFunctions";
import { UserService } from "../services";
import * as AWS from "../AWS/Cognito/cognitoFunctions";
import { Auth_Types } from "../../../myTypes";

const register = async function({email,password,name,role}: Auth_Types.RegisterData){
    const aws_resp = await AWS.createAWSAccount(email,password,name);
    const db_resp = await UserService.createUserRecord(aws_resp.UserSub,email,name,role,aws_resp.UserConfirmed);
    return db_resp;
}

const login = async function({email,password}:{email:string, password:string}){
    // const aws_credential = await AWS.getCredential(email, password);

    console.log("AWS Login");


    const credential = await AWS.getCredential(email, password);
    console.log("🚀 ~ file: authService.ts ~ line 15 ~ login ~ credential", credential)
    const db_record = await UserService.getUserRecord(email);
    await AWS.assignUserToGroup(credential,email,db_record.role);
    return {credentials: credential,user: db_record}
}

const confirm = async function(email: string, confirmationCode: string){
    const aws_resp = await AWS.confirmAWSAccount(email, confirmationCode);
    const db_resp = await UserService.confirmAccount(email)
    return db_resp;
}

const isUserExist = async function(email: string){
    return UserService.isUserExist(email);
}

export {register, login, confirm, isUserExist}

