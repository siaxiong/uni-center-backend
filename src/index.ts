import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config({override: true});

import {NextFunction, Request, Response } from "express";
import express from "express";
import cors from "cors";
import {AuthRouter, CourseRouter, UserRouter, ProfessorRouter} from "./v1/routes/routers";
import { API_Authorization } from "./v1/middlewares/authorize";
import { ENV_API } from "./EnvironmentVariables";
import { UserTable } from "./v1/database/database-functions";
import { AuthenticateJWT } from "./v1/middlewares/authenticateJWT";

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
	console.log(`BODY: ${JSON.stringify(req?.body)}`);
	console.log(`OriginalURL: ${JSON.stringify(req?.url)}`);
	console.log(`QUERY: ${JSON.stringify(req?.query)}`);
	console.log("*******************************");
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
	// console.log("********************************************");

	// const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkJVRFJNRWFnS25XeTdiMnZza05PRCJ9.eyJodHRwczovL3VuaXZlcnNpdHktY2VudGVyLnNpYXhpb25nLmNvbS9yb2xlcyI6WyJBZG1pbiJdLCJpc3MiOiJodHRwczovL3VuaXZlcnNpdHktY2VudGVyLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJvYXV0aDJ8R29vZ2xlfDExNjA5MDgyNDYzNTQ1MzgyNTM2NCIsImF1ZCI6WyJodHRwczovL3VuaXZlcnNpdHktY2VudGVyLnNpYXhpb25nLmNvbSIsImh0dHBzOi8vdW5pdmVyc2l0eS1jZW50ZXIudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY3MDg2OTQ4MywiZXhwIjoxNjcwOTU1ODgzLCJhenAiOiJPZjVOcTJkOHV1N3JWYnZVbjZSRDF1U3o0dlpJMDZYUSIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgb2ZmbGluZV9hY2Nlc3MiLCJwZXJtaXNzaW9ucyI6WyJjcmVhdGU6dXNlcnMiLCJkZWxldGU6dXNlcnMiLCJyZWFkOnVzZXJzIiwidXBkYXRlOnVzZXJzIl19.NvVY4lNgd4lG0xB6XGMf_yEfBFiU8MN5BsLcUxnY_fxGnCSYABo2rCewPFNRqj6dwsaqFBNRDIBQ521MJosFLE_tz1uoCOYDrBv8eqN0dEhD65O9lUwEzptzmCwizDuXPV2weLXPvWQMbcq6xqpulec9k24tAmJz34NW_fmyIwe99ozfPbnd3kTPWFog4Fbj7C0gyMMsH8ZHXq0425eYvO3VnQRGnokjhFMeLt_ccEeL-jT31qT2GX1X2dvcBIr7JgyZ-KAhIYgwNo5t2WadZzJiOAFzyZ8RDbSUGq4TGjp_s0wYnJ9nj1XSlMYIBnQIkURzUpmXAP260uV1c45Mq";
	// const data = await AuthenticateJWT(token);
	// console.log("🚀 ~ file: index.ts:52 ~ app.listen ~ data", data);

	
});
