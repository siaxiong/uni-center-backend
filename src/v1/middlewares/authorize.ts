import {Response, Request, NextFunction} from "express";
import { AdminRolePermissions } from "./PermissionScopes";
import { jwtVerify, importJWK } from "jose";
import jwks from "./jwks.json";
import { ENV_API } from "../../EnvironmentVariables";

export const API_Authorization = async function(req: Request, resp: Response, next: NextFunction){
	let accessToken = req.header("Authorization");

	accessToken = accessToken?.substring("Bearer ".length); 
	if(!accessToken?.length) throw new Error("empty access token!");

	//Check if jwtVerify checks expiration date
	const publicKey = await importJWK(jwks.keys[0], "RS256");
	const {payload} = await jwtVerify(accessToken, publicKey, {
		audience: ENV_API.Audience,
		issuer: ENV_API.Issuer,
	});
	console.log("🚀 ~ file: authorize.ts:19 ~ constAPI_Authorization=function ~ payload", payload);
	
	const roleInToken = (payload[ENV_API.RoleClaim] as string[])[0];

	const permissionsInToken = payload["permissions"] as string[];
	
	//Check for valid role
	if(!["Admin","Professor","Student"].find(role=>role===roleInToken)) throw new Error("Invalid role in access token!");

	//Check for valid permissions
	switch(roleInToken){
	case "Admin": 
		permissionsInToken.forEach(permission=>{
			if(!AdminRolePermissions.includes(permission)) throw new Error("Invalid permission(s) in access token!");
		});
		break;
	}

	next();
};