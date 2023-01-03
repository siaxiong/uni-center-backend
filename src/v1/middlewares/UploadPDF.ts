import { Response, Request, NextFunction } from "express";
import fs, { createReadStream } from "fs";
import {s3UploadPDF} from "../services/AWS/S3/s3Functions";


export const UploadPdfMiddleware = async function(req: Request, resp: Response, next: NextFunction){
	try {
		if(!req.file) throw new Error("Problem with PDF attachment");
		const readStream = createReadStream(`${req.file?.path}`);

		const response = await s3UploadPDF(readStream, req.file);
	
		//need a way to make sure these query parameters correlate
		//to the db table attributes DYNAMICALLY
		req.query.pdfId = response.VersionId;
		req.query.pdfName = req.file.originalname,
		next();
		
	} catch (error) {
		console.log(error);
		resp.status(400).send(error);
	}
};