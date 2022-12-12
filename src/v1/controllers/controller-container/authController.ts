import { Request, Response } from "express";
import { AuthService, UserService } from "../../services/services";
import { catchError } from "../../utils/catchError";
import axios from "axios";
import URL from "url";
import {AuthenticateJWT} from "../../middlewares/authenticateJWT";
import { Prisma, User } from "@prisma/client";
import { Registration } from "../../../CustomTypes";

export const register = catchError(
	async function(req: Request, resp: Response){
		const {email, password, name, role, sub} = req.body;
		console.log("🚀 ~ file: authController.ts:13 ~ function ~ name", name);
		console.log("🚀 ~ file: authController.ts:13 ~ function ~ email", email);
		console.log("🚀 ~ file: authController.ts:13 ~ function ~ sub", sub);

		let userRecord: User;

		if(sub) userRecord = await AuthService.idpRegistration({id:sub, email, name});
		else userRecord = await AuthService.formRegistration({userCreateInput: {email, role, name},password});
		console.log("🚀 ~ file: authController.ts:21 ~ function ~ userRecord", userRecord);

		resp.json(userRecord);
	}
);

export const login = catchError(
	async function(req: Request, resp: Response){
		const {email, password} = req.body;
		const data = await AuthService.login({email,password});
		resp.json(data);
	}
);

export const assignRole = async function(){
	const extensionURL = "https://university-center.us.webtask.run/adf6e2f2b84784b57522e3b19dfc9201/users";
	const path = "{user_id}/roles";

	await axios({method:"PATCH", url:extensionURL, headers: {"Authorization":"Bearer #"}});

};

export const getAuthTokens = catchError(
	async function(req: Request, resp: Response){
		const {url, code, client_id, redirect_uri, grant_type} = req.body;

		const data = new URL.URLSearchParams({
			"code": code,
			"grant_type": grant_type,
			"client_id": client_id,
			"redirect_uri": redirect_uri,
			"code_verifier":"TEOMk_xr1AziVpj-eDDWm1pzOqtZWlpvKHcf.UsDM.BCTNnKv-pSImRzI8huqPQWZ4NdNShMDg_Ww6EzcmGWvZMG1su~1OqR3GsjMSjj4.3BorG-ZZ451Xvd~1dqlnk7",
			// "client_secret": "Ls4wSBNmTNGllJUu17cne26sCOCoL9FphtC0amGdvXtcPOf0QXaSYC6Dlqs_dzkO"
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
		const identityTokenData = await AuthenticateJWT(token.data.id_token);
		// console.log("🚀 ~ file: authController.ts:73 ~ function ~ identity", identityTokenData);
		
		console.log("🚀 ~ file: authController.ts:57 ~ function ~ token", token.data);

		// const accessData = await AuthenticateJWT(token.data.access_token);
		
		console.log("****TOKEN END*******");

		resp.json({identityTokenData, tokens: {accessToken: token.data.access_token, idToken: token.data.id_token, refreshToken: token.data.refresh_token}});

	}
);


export const userExist = catchError(
	async function(req: Request, resp: Response){
		const {email} = req.query;
		const bool = await AuthService.isUserExist(email as string);
		resp.json({userEmail:email,userExist:bool});
	}
);

