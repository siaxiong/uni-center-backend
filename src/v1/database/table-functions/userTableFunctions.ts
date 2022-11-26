import { UserType } from "@aws-sdk/client-cognito-identity-provider";
import { Prisma} from "@prisma/client";
import prismaClient from "../prismaClient";

// const userType: Prisma.UserSelect = {
//     id: true,
//     name: true,
//     email: true,
//     role: true,
//     aws_confirmed: true,
//     enrolled: true,
// }

interface UserRecord{
    id?: string,
    name?: string,
    email?: string,
    role?: string,
    aws_confirmed?: boolean,
    enrolled?: string,
}

const courseType: Prisma.CourseSelect = {
    id: true,
    name: true,
    description: true,
}

const professorType: Prisma.ProfessorSelect = {
    id: true,
    courseId: true,
    userId: true,
    course: true,
}

const getUserRecord = async function(email: string){
    return prismaClient.User.findUnique({
        where: {
            email
        }
    })
}

const createUserRecord = async function(id: string, email: string, name: string, role: string, confirmed: boolean){
    return prismaClient.User.create({
        data: {
            id,
            email,
            name,
            role: role.toLocaleUpperCase(),
            aws_confirmed: confirmed,
        }
    })
}

const confirmAccount = async function(email: string){
    return prismaClient.User.update({
        where: {
            email
        },
        data: {
            aws_confirmed: true
        }
    })
}

const isUserExist = async function(email:string){
    const data = await prismaClient.User.findMany({
        where:{
            email
        }
    })
    return false;
}


const getUsers = async function(){
    return prismaClient.User.findMany();
}

const getUniqueUser = async function(id: string){
    return prismaClient.User.findUnique({
        where:{
            id
        }
    })
}

const getFilteredUsers = async function(user: UserRecord){
    console.log("getFIlteredUsers")
    return prismaClient.User.findMany({
        where: user
    })
}

const updateUser = async function(payload: UserRecord){
    return prismaClient.User.update({
        where: {
            id: payload.id
        },
        data: payload
    })
}






//Seperating exports for the purpose of organization to easily find avaiable methods
export {getUserRecord, getUsers, getUniqueUser, getFilteredUsers}
export {createUserRecord, confirmAccount, isUserExist}
export {updateUser}
