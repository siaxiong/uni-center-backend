import { S3Client } from "@aws-sdk/client-s3";
import {Request} from "express";

export namespace AWS_Types {
    export interface Credentials {
        accessKeyId: string,
        secretAccessKey: string,
        expiration: Date,
        sessionToken: string,
    }
}
export namespace Auth_Types {
    export interface LoginData {
        email: string,
        password: string
    }
    export interface RegisterData {
        email: string,
        password: string,
        name: string,
        role: string,
    }
}

declare global {
    export namespace Express {
        export interface Request {
            body ? : any
            client ? : S3Client
        }
  }}