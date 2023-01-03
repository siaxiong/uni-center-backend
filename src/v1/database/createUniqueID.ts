/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Prisma, PrismaClient } from "@prisma/client";
import prismaClient from "./prismaClient";

// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck


export const createUniqueID = async function(tableName: Prisma.ModelName): Promise<string>{
	const id = Math.random().toString(36).substring(2,7).toUpperCase();

	let resp: any = true;

	while(resp){
		switch(tableName){

		//if no user found, null will be returned 
		//thus exits the  loop
		case "Admin":
			resp = await prismaClient.admin.findUnique({
				where: {
					id
				}
			});
			break;
		case "ProfessorCourse":
			resp = await prismaClient.professorCourse.findUnique({
				where: {
					id
				}
			});
			break;
		case "User":
			resp = await prismaClient.user.findUnique({
				where: {
					id
				}
			});
			break;
		case "StudentCourse":
			resp = await prismaClient.studentCourse.findUnique({
				where: {
					id
				}
			});
			break;
		case "Course":
			resp = await prismaClient.course.findUnique({
				where: {
					id
				}
			});
			break;
		case "AssignmentSubmission" :
			resp = await prismaClient.assignmentSubmission.findUnique({
				where: {
					id
				}
			});
			break;
		case "Assignment":
			resp = await prismaClient.assignment.findUnique({
				where: {
					id
				}
			});
			break;
		default:
			throw new Error("No table name matched");
		}
	}
	
	return id;

};