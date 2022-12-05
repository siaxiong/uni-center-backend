/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Prisma, PrismaClient } from "@prisma/client";
import prismaClient from "./prismaClient";

// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export default async function(tableName: Prisma.ModelName): Promise<string>{
	const id = Math.random().toString(36).substring(2,7).toUpperCase();

	let resp: any = true;

	while(resp){
		console.log("createUniqueID");
		switch(tableName){
		case "Admin":
			resp = await prismaClient.admin.findUnique({
				where: {
					id
				}
			});
			break;
		case "Professor":
			await prismaClient.professor.findUnique({
				where: {
					id
				}
			});
			break;
		case "User":
			await prismaClient.professor.findUnique({
				where: {
					id
				}
			});
			break;
		case "Student":
			await prismaClient.student.findUnique({
				where: {
					id
				}
			});
			break;
		case "Course":
			await prismaClient.course.findUnique({
				where: {
					id
				}
			});
			break;
		case "Grade":
			await prismaClient.student.findUnique({
				where: {
					id
				}
			});
			break;
		default:
			throw new Error("No table name matched");
		}
		console.log(resp);
		if(resp) resp = "";

	}

	
	//If returned result is empty, that means no record
	//in that table has the generated id and the id can be use.

	return id;

}