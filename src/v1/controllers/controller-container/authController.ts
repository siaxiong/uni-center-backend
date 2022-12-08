import { Request, Response } from "express";
import { AuthService, UserService } from "../../services/services";
import { catchError } from "../../utils/catchError";
import axios from "axios";
import URL from "url";
import {AuthenticateJWT} from "../../middlewares/authenticateJWT";
import { Prisma, User } from "@prisma/client";
import { GetOpenIdTokenCommandOutput } from "@aws-sdk/client-cognito-identity";
import { Auth_Types } from "../../../myTypes";

const register = catchError(
	async function(req: Request, resp: Response){
		const {email, password, name, role} = req.body;
		const data = await AuthService.register({userCreateInput: {email, role, name},password});
		resp.json(data);
	}
); 


const login = catchError(
	async function(req: Request, resp: Response){
		const {email, password} = req.body;
		const data = await AuthService.login({email,password});
		resp.json(data);
	}
);

const ssoLogin = catchError(
	async function(req: Request, resp: Response){
		const {url, code, client_id, redirect_uri, grant_type} = req.body;

		const data = new URL.URLSearchParams({
			"code": code,
			"grant_type": grant_type,
			"client_id": client_id,
			"redirect_uri": redirect_uri,
			"client_secret": "Ls4wSBNmTNGllJUu17cne26sCOCoL9FphtC0amGdvXtcPOf0QXaSYC6Dlqs_dzkO"
		});

		const token = await axios({
			method: "POST",
			// url: `${url}/oauth2/token`,
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
		const identity = await AuthenticateJWT(token.data.id_token);
		console.log(identity);
		console.log("****TOKEN END*******");

		const userPayload: Prisma.UserCreateManyInput = {
			id:identity.sub as string,
			email: identity.email as string,
			name: identity.name as string,
			role: null,
			aws_confirmed: false,
			enrolled: "PENDING"
		};
		// await UserService.deleteUniqueUser(userPayload.id);
		let userRecord = (await UserService.getFilteredUsers({email: identity.email as string}))[0];
		console.log("🚀 ~ file: authController.ts:68 ~ function ~ userRecord", userRecord);
		if(!userRecord) userRecord = await UserService.createUserRecord(userPayload);

		console.log("🚀 ~ file: authController.ts:69 ~ function ~ userRecord", userRecord);

		resp.json({userRecord, tokens: {accessToken: token.data.access_token, idToken: token.data.id_token, refreshToken: token.data.refresh_token}});

	}
);


const confirm = catchError(
	async function(req: Request, resp: Response){
		const {email, confirmationCode} = req.body;
		const data = await AuthService.confirm(email,confirmationCode);
		resp.json(data);
	}
);

const userExist = catchError(
	async function(req: Request, resp: Response){
		const {email} = req.query;
		const bool = await AuthService.isUserExist(email as string);
		resp.json({userEmail:email,userExist:bool});
	}
);

export {register, login, ssoLogin, confirm, userExist};