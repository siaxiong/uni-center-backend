import {Response, Request, NextFunction} from "express";
import { AuthenticateJWT } from "./authenticateJWT";
import { AdminRolePermissions } from "./PermissionScopes";



export const API_Authorization = async function(req: Request, resp: Response, next: NextFunction){
	let accessToken = req.header("Authorization");

	accessToken = accessToken?.substring("Bearer ".length); 
	if(!accessToken?.length) throw new Error("empty access token!");


	const decryptedToken = await AuthenticateJWT(accessToken);
	
	const roleInToken = (decryptedToken["https://university-center.siaxiong.com/roles"] as string[])[0];
	const permissionsInToken = decryptedToken["permissions"] as string[];
	const audienceInToken = decryptedToken["aud"];
	const issuerInToken = decryptedToken["iss"];
	
	//Check audience
	if(!audienceInToken?.includes("https://university-center.siaxiong.com")) throw new Error("invalid access token!");

	//Check issuer
	if(issuerInToken !== "https://university-center.siaxiong.com") throw new Error("invalid access token!");

	//Check access expiration !!!

	//Check for valid role
	if(!["Admin","Professor","Student"].find(role=>role===roleInToken)) throw new Error("Invalid role in access token!");

	//Check for valid permissions
	switch(roleInToken){
	case "Admin": 
		permissionsInToken.forEach(permission=>{
			if(!AdminRolePermissions.includes(permission)) throw new Error("Invalid permission(s)");
		});
		break;
	}

	next();
};