import { Request, Response } from "express";
import { AuthService } from "../../services/services";
import axios from "axios";
import URL from "url";
import {AuthenticateJWT} from "../../middlewares/authenticateJWT";
import { User } from "@prisma/client";
import { body } from "express-validator";

export  async function register(req: Request, resp: Response){
	const {email, password, name, role, sub} = req.body;
	console.log(body);

	let userRecord: User;
	
	if(sub) userRecord = await AuthService.idpRegistration({id:sub, email, name});
	else userRecord = await AuthService.formRegistration({userCreateInput: {email, role, name},password});
	console.log("🚀 ~ file: authController.ts:17 ~ register ~ userRecord", userRecord);

	resp.json(userRecord);
}

export const login = async function(req: Request, resp: Response){
	const {email, password} = req.body;
	const data = await AuthService.login({email,password});
	resp.json(data);
};

export const getAuthTokens = async function(req: Request, resp: Response){
	const {url, code, client_id, redirect_uri, grant_type} = req.body;
	console.log("🚀 ~ file: authController.ts:30 ~ getAuthTokens ~ req.body", req.body);

	const data = new URL.URLSearchParams({
		"code": code,
		"grant_type": grant_type,
		"client_id": client_id,
		"redirect_uri": redirect_uri,
		// "code_verifier":"OMk_xr1AziVpj-eDDWm1pzOqtZWlpvKHcf.UsDM.BCTNnKv-pSImRzI8huqPQWZ4NdNShMDg_Ww6EzcmGWvZMG1su~1OqR3GsjMSjj4.3BorG-ZZ451Xvd~1dqlnk7",

		"code_verifier":"TEOMk_xr1AziVpj-eDDWm1pzOqtZWlpvKHcf.UsDM.BCTNnKv-pSImRzI8huqPQWZ4NdNShMDg_Ww6EzcmGWvZMG1su~1OqR3GsjMSjj4.3BorG-ZZ451Xvd~1dqlnk7",
	});

	const token = await axios({
		method: "POST",
		url: `${url}/oauth/token`,
		headers: {
			"Content-Type":"application/x-www-form-urlencoded",
			"Accept": "application/json",
			"Accept-Encoding": "identity" 
		},
		data
	});
    
	console.log("****TOKEN START*******");
	console.log(token.data);
	const identityData = await AuthenticateJWT(token.data.id_token);
	console.log("🚀 ~ file: authController.ts:73 ~ function ~ identity", identityData);
		
	console.log("🚀 ~ file: authController.ts:57 ~ function ~ token", token.data);

	// const accessData = await AuthenticateJWT(token.data.access_token);
		
	console.log("****TOKEN END*******");

	resp.json({identityData, tokens: {accessToken: token.data.access_token, idToken: token.data.id_token, refreshToken: token.data.refresh_token}});

};


export const userExist = async function(req: Request, resp: Response){
	const {email} = req.query;
	const bool = await AuthService.isUserExist(email as string);
	resp.json({userEmail:email,userExist:bool});
};

