import { Request, Response } from "express";
import { AuthService } from "../../services/services";
import { catchError } from "../../utils/catchError";
import axios from "axios";
import URL from "url";

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
		const {url, code, client_id, redirect_uri} = req.body;

		const data = new URL.URLSearchParams({
			"code": code,
			"grant_type": "authorization_code",
			"client_id": client_id,
			"redirect_uri": redirect_uri,
		});

		const token = await axios({
			method: "POST",
			url: `${url}/oauth2/token`,

			headers: {
				"Content-Type":"application/x-www-form-urlencoded",
			},
			data
		});
    
		console.log("****TOKEN START*******");
		console.log(token.data);
		console.log("****TOKEN END*******");

		const userInfoToken = await axios({
			url: `${url}/oauth2/userInfo`,
			headers: {"Authorization":`Bearer ${token.data.access_token}`}
		});

		console.log("****USER_INFO_TOKEN START*******");
		console.log(userInfoToken.data);
		console.log("****USER_INFO_TOKEN TOKEN END*******");

		resp.json(userInfoToken.data);

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