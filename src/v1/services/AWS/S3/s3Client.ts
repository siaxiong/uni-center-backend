import {S3Client} from "@aws-sdk/client-s3";
import {CognitoIdentityClient} from "@aws-sdk/client-cognito-identity";
import {fromCognitoIdentityPool} from "@aws-sdk/credential-provider-cognito-identity";
import { NextFunction, Request, Response } from "express";
import { AWS_Types } from "../../../../myTypes";

const REGION = process.env.AWS_REGION;
const IDENTITY_POOL_ID = process.env.AWS_IDENTITY_POOL_ID;

/* the credentials obj can also take the following properties:
Expiration, SessionToken, SecretAccessKey*/
const s3Init = (token : AWS_Types.Credentials ) => {
    const s3Client = new S3Client({
        region: REGION,
        credentials: {
            accessKeyId: token.accessKeyId,
            secretAccessKey: token.secretAccessKey,
            expiration: token.expiration,
            sessionToken: token.sessionToken,
        },
    });
    return s3Client;
};

/* Creating a new s3 client with the credentials from the cognito identity pool.*/
const s3Client = new S3Client({
    region: REGION,
    credentials: fromCognitoIdentityPool({
        client: new CognitoIdentityClient({region: REGION}),
        identityPoolId: IDENTITY_POOL_ID as string,
    }),
});

const s3MiddleWare = function(req : Express.Request, res : Response, next : NextFunction) {
    console.log("s3MiddleWare");
    console.log(req.body.token);
    const client = s3Init(req.body.token);
    req.client = client;
    next();
};

export {s3Init, s3Client};