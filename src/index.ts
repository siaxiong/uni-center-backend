import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config({override: true});
// console.log(process.env);

import {NextFunction, Request, Response } from "express";
import express from "express";
import cors from "cors";
import {AuthRouter, CourseRouter, UserRouter, ProfessorRouter} from "./v1/routes/routers";
import { AuthenticateJWT, AuthenticateUser } from "./v1/middlewares/authenticateJWT";

import { UserService } from "./v1/services/services";
import { API_Authorization } from "./v1/middlewares/authorize";
import { authenticationClient , auth0ManagementClient} from "./v1/services/Auth0/Auth0";
import axios from "axios";

const app = express();
const PORT = 3500;

app.use(express.json());
app.use(cors());

app.get("/",(req: Request, res: Response)=>{
	res.json({
		status: `Server is running on port ${PORT}`,
	}); 
});

const printRequestInfo = (req : Request,resp : Response, next: NextFunction)=>{
	console.log("******** REQUEST INFO *********");
	console.log(`METHOD: ${(req.method).toUpperCase()} ${req?.path}`);
	// console.log(`AuthorizationHeader: ${req.header("Authorization")}`);
	console.log(`BODY: ${JSON.stringify(req?.body)}`);
	console.log(`OriginalURL: ${JSON.stringify(req?.url)}`);
	console.log(`QUERY: ${JSON.stringify(req?.query)}`);
	console.log("*******************************");
	next();
};

app.use(printRequestInfo);

app.use("/api/v1", AuthRouter);
app.use(API_Authorization);
app.use("/api/v1/courses", CourseRouter);
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/professors", ProfessorRouter);
app.listen(PORT, async ()=>{
	console.log(`******* listening on port ${PORT} ********`);

	const data = await authenticationClient.passwordGrant({
		username:"siaxiongdev1@gmail.com",
		password:"123password",
		realm: "Username-Password-Authentication",
		audience: "https://university-center.siaxiong.com",
		scope: "offline_access openid"
	},);
	// console.log(data);

	//TEST this token again for expiration!!!!!!
	//const data AuthenticateJWT("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkJVRFJNRWFnS25XeTdiMnZza05PRCJ9.eyJodHRwczovL3VuaXZlcnNpdHktY2VudGVyLnNpYXhpb25nLmNvbS9yb2xlcyI6WyJBZG1pbiIsIlByb2Zlc3NvciJdLCJpc3MiOiJodHRwczovL3VuaXZlcnNpdHktY2VudGVyLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2Mzk2OGIwYjlhYzY4Zjg4MWY3YmU1YmYiLCJhdWQiOlsiaHR0cHM6Ly91bml2ZXJzaXR5LWNlbnRlci5zaWF4aW9uZy5jb20iLCJodHRwczovL3VuaXZlcnNpdHktY2VudGVyLnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2NzA4MTQ3MjIsImV4cCI6MTY3MDkwMTEyMiwiYXpwIjoiT2Y1TnEyZDh1dTdyVmJ2VW42UkQxdVN6NHZaSTA2WFEiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIGFkZHJlc3MgcGhvbmUgb2ZmbGluZV9hY2Nlc3MiLCJndHkiOiJwYXNzd29yZCIsInBlcm1pc3Npb25zIjpbImNyZWF0ZTp1c2VycyIsImRlbGV0ZTp1c2VycyIsInJlYWQ6dXNlcnMiLCJ1cGRhdGU6dXNlcnMiXX0.NzgQ2FaAaXFAOxYx3s56BLpJxj1Hqlcqjlr0j6Eymk4hx4DTcipRFHOf0_smXCERrzaZjacbT_eC7qu5yZM2WE7JSJdWI584t5Tarzw1TtBsw1aaHcVrfGX7GdXKqdhfsvPaj6p6yiaTEIijnuCYPfmewe78HnccI7rmuoIRc7C9AYhQ-LEk6Y7x3c2XDsgs7yQidr3X9wZeah3B-t7CAl-1FOWVFrElyPvYQc8iKrZScPS3WhKsb1XaJfVXSVHAGsxbiOcU7nx3rSkMopQFyuvecXOzbOx7ykzUhwLp7L_pgAw4B53FXsuvapV50fa1yS3y00PSpBBMuu1yrNmcw")
	//console.log(data);
	
});
