import { NextFunction, Request, Response } from "express";
import { jwtVerify, importJWK } from "jose";
import jwks from "./jwks.json";
import jwks2 from "./0auth_jwks.json";


export const AuthenticateJWT = async function(jwt: string){
	// const publicKey = await importJWK(jwks.keys[0], "RS256");

	const publicKey = await importJWK(jwks2.keys[0], "RS256");
	const {payload, protectedHeader} = await jwtVerify(jwt, publicKey);
	
	return payload;
};

export const AuthenticateUser = (req: Request, resp: Response, next: NextFunction)=>{
	console.log("****** AUTHENTICATE MIDDLEWARE START");
	console.log(req.headers.authorization);
	console.log("****** AUTHENTICATE MIDDLEWARE END");

	next();
};