import {Response, Request, NextFunction} from "express";
import { AdminRolePermissions } from "./PermissionScopes";
import { jwtVerify, importJWK } from "jose";
import { ENV_API } from "../../EnvironmentVariables";

export const BasicAuthorization = async function(accessToken: string, actionMsg: string){
	try {
		accessToken = accessToken?.substring("Bearer ".length); 
		if(!accessToken?.length) throw new Error("empty access token!");

		//Check if jwtVerify checks expiration date
		const publicKey = await importJWK(ENV_API.JWK.keys[0], "RS256");
		await jwtVerify(accessToken, publicKey, {
			audience: ENV_API.UniCenter_API_Audience,
			issuer: ENV_API.Issuer,
		});
		return true;
		
	} catch (error) {
		console.log(error);	
		return false;
	}
};

export const API_Authorization = async function(req: Request, resp: Response, next: NextFunction){

	try {
		let accessToken = req.header("Authorization");

		const requestPayload = {
			path: req.path,
			method: req.method,
			body: req.body
		};

		accessToken = accessToken?.substring("Bearer ".length); 
		if(!accessToken?.length) throw new Error("empty access token!");

		//Check if jwtVerify checks expiration date
		const publicKey = await importJWK(ENV_API.JWK.keys[0], "RS256");
		const {payload} = await jwtVerify(accessToken, publicKey, {
			audience: ENV_API.UniCenter_API_Audience,
			issuer: ENV_API.Issuer,
		});

		console.log(payload);
		const roleInToken = (payload[ENV_API.RoleClaim] as string[])[0];

		const permissionsInToken = payload["permissions"] as string[];
	
		// //Check for valid role
		// if(!["Admin","Professor","Student"].find(role=>role===roleInToken)) throw new Error("Invalid role in access token!");

		//Check for valid permissions
		switch(roleInToken){
		case "Admin": {
			permissionsInToken.forEach(permission=>{
				if(!AdminRolePermissions.includes(permission)) throw new Error("Invalid permission(s) in access token!");
			});
			break;
		}
		}

		console.log("*****");
		console.log("Access Token  Check Passed!");
		console.log("*****");

		next();
		
	} catch (error) {
		console.log("*****");
		console.log(error);
		console.log("*****");

		resp.status(403).send("Invalid access token");
		
	}
	
};