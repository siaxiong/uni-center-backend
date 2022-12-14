import express, {Request, Response, NextFunction} from "express";
import { BasicAuthorization } from "../authorize";

const PUT_METHOD = (req: Request, resp: Response, next: NextFunction)=>{
	const acceptableProperties = ["role","name", "enrollmentStatus"];
	const incomingProperties = Object.getOwnPropertyNames(req.body);
	console.log("🚀 ~ file: userRouter.ts:16 ~ router.put ~ incomingProperties", incomingProperties);
	
	incomingProperties.forEach(async key=>{
		try {
			if(!acceptableProperties.includes(key)) throw new Error("Invalid property in body");
			if(key === "role") {
				if(!["Admin","Professor","Student"].includes(req.body[key])) throw new Error("Invalid value in role property");
			}
			if(key === "enrollmentStatus") {
				const accessToken = req.header("Authorization");
				console.log("enrollmentStatus update");
				if(!accessToken) throw new Error("No access token to update enrollment status");
				const status = await BasicAuthorization(accessToken, "Update enrollment status");
				if(!status) throw new Error("Invalid access token to update enrollment status");
			} 
				
			console.log("*****");
			console.log("USER_PUT_METHOD PASSED!");
			console.log("*****");
	
			next();
				
		} catch (error) {
			console.log(error);
			console.log("*****");
			console.log("USER_PUT_METHOD FAILED!");
			console.log("*****");
			resp.status(400).send("invalid token");
		}
	});
};

export const ValidateUserRoute = {
	PUT_METHOD,
};