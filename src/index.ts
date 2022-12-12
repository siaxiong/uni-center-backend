import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config({override: true});

import {NextFunction, Request, Response } from "express";
import express from "express";
import cors from "cors";
import {AuthRouter, CourseRouter, UserRouter, ProfessorRouter} from "./v1/routes/routers";
import { API_Authorization } from "./v1/middlewares/authorize";
import { ENV_API } from "./EnvironmentVariables";


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

	console.log("********ENVIRONMENT VARIABLES CHECK*********");
	console.log(ENV_API);
	console.log("********************************************");

	
});
