import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config({override: true});
console.log(process.env);

import { json, NextFunction, Request, RequestHandler, Response } from "express";
import express from "express";
import cors from "cors";
import {AuthRouter, CourseRouter, UserRouter, ProfessorRouter} from "./v1/routes/routers";


const app = express();
const PORT = 3500;

app.use(express.json());
app.use(cors());


app.get("/",(req: Request, res: Response)=>{
    res.json({
        status: `Server running on port ${PORT}`,
    }) 
})

const printRequestInfo = (req : Request,resp : Response, next: NextFunction)=>{
    console.log("******** REQUEST INFO *********")
    console.log(`METHOD: ${(req?.method).toUpperCase()} ${req?.path}`)
    console.log(`BODY: ${JSON.stringify(req?.body)}`);
    console.log(`OriginalURL: ${JSON.stringify(req?.originalUrl)}`);
    console.log(`QUERY: ${JSON.stringify(req?.query)}`);
    console.log("*******************************")
    next();
}

app.use("/api/v1", printRequestInfo, AuthRouter);
app.use("/api/v1/courses",printRequestInfo, CourseRouter);
app.use("/api/v1/users", printRequestInfo, UserRouter)
app.use("/api/v1/professors", printRequestInfo, ProfessorRouter)
app.listen(PORT, ()=>{
    console.log(`******* listening on port ${PORT} ********`)

});
