/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	GetObjectCommand,
	PutObjectCommand,
	DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import {s3Client}from "./s3Client";
import fs, { ReadStream } from "node:fs";

const BUCKET_NAME = process.env.UC_AWS_BUCKET_NAME;

export const s3UploadPDF = async function(payload: ReadStream, file: Express.Multer.File){
	const cmd = new PutObjectCommand({
		Bucket: BUCKET_NAME,
		Key: file.originalname,
		Body: payload,
		ContentLength: file.size
	});

	const response = await s3Client.send(cmd);
	fs.unlink(file.path,e=>{
		if(e instanceof Error) console.log(e);
	});	
	
	return response;
};

export const s3GetPDF = async function(payload: {VersionId: string, Key:string}){
	const cmd = new GetObjectCommand({
		...payload,
		Bucket: BUCKET_NAME,
	});
	return s3Client.send(cmd);
};

export const s3DeletePDF = async function(payload: {VersionId:string, Key:string}){
	const cmd = new DeleteObjectCommand({
		...payload,
		Bucket: BUCKET_NAME,
	});

	return s3Client.send(cmd);
}; 