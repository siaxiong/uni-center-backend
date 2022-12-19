import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config({override: true});

import {NextFunction, Request, Response } from "express";
import express from "express";
import cors from "cors";
import {AuthRouter, CourseRouter, UserRouter, ProfessorRouter} from "./v1/routes/routers";
import { API_Authorization } from "./v1/middlewares/authorize";
import { ENV_API } from "./EnvironmentVariables";
import { UserTable } from "./v1/database/database-functions";
import { UserService } from "./v1/services/services";
import { AuthenticateJWT } from "./v1/middlewares/authenticateJWT";
import { rejects } from "assert";

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
	console.log("******** REQUEST INFO START*********");
	console.log(`METHOD: ${(req.method).toUpperCase()} ${req?.path}`);
	console.log(`BODY: ${JSON.stringify(req?.body)}`);
	console.log(`URL: ${JSON.stringify(req?.url)}`);
	console.log(`QUERY: ${JSON.stringify(req?.query)}`);
	console.log("******** REQUEST INFO END*********");
	next();
};

app.use(printRequestInfo);

app.use("/api/v1", AuthRouter);
app.use("/api/v1/users", UserRouter);
app.use(API_Authorization);
app.use("/api/v1/courses", CourseRouter);
app.use("/api/v1/professors", ProfessorRouter);
app.listen(PORT, async ()=>{
	console.log(`******* listening on port ${PORT} ********`);

	console.log("********ENVIRONMENT VARIABLES CHECK*********");
	console.log(ENV_API);
	// const baseCredential = {
	// 	domain: ENV_API.Domain,
	// 	client_id: ENV_API.M2M_ClientID,
	// 	client_secret: ENV_API.M2M_ClientSecret,
	// };

	// console.log(Object.entries(baseCredential));
	// console.log(...Object.entries(baseCredential));

	
	console.log("********************************************");


	
});
