import { UserTable, ProfessorTable } from "../../database/database-functions";
import { checkEmptyValue } from "../../utils/checkDBResult";
import prismaClient from "../../database/prismaClient";

interface UserRecord{
    id?: string,
    name?: string,
    email?: string,
    role?: string,
    aws_confirmed?: boolean,
    enrolled?: string,
}

export const getUserRecord = async function(email: string){
    return checkEmptyValue(UserTable.getUserRecord(email))
}

export const createUserRecord = async function(id: string, email: string, name: string, role: string, confirmed: boolean){
    return checkEmptyValue(UserTable.createUserRecord(id,email,name,role,confirmed));
}

export const confirmAccount = async function(email: string){
    return checkEmptyValue(UserTable.confirmAccount(email));
}

export const isUserExist = async function(email:string){
    // return checkEmptyValue(UserTable.isUserExist(email));
    return UserTable.isUserExist(email)
}


export const getUsers = async function(){
    return checkEmptyValue(UserTable.getUsers());
}

export const getUniqueUser = async function(id: string){
    return checkEmptyValue(UserTable.getUniqueUser(id));

}

export const getFilteredUsers = async function(user: UserRecord){
    return checkEmptyValue(UserTable.getFilteredUsers(user));
}

export const updateUser = async function(payload: UserRecord){
    return checkEmptyValue(UserTable.updateUser(payload));
}

export const deleteUniqueUser = async function(id: string){
    //it seems like it needs to use the same "prismaClient" instantiation
    //thus, importorting from diff module would use diff instantiation cause transaction to not work
    const data = await prismaClient.$transaction([prismaClient.Professor.deleteMany({where:{userId:id}}), prismaClient.User.delete({where:{id}})])
    console.log("🚀 ~ file: userService.ts ~ line 52 ~ deleteUniqueUser ~ data", data)
    //i dont need the first object that $transaction returns
    return checkEmptyValue(data[1]);
}



// const deleteUniqueUser = async function(id:string){
//     const data = await UserTable.deleteUniqueUser(id);
//     if(!data?.id) throw new
// }
