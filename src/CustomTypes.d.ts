/* eslint-disable @typescript-eslint/no-namespace */
import { S3Client } from "@aws-sdk/client-s3";
import { Professor, User, Course } from "@prisma/client";

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
        userRecord: User,
        tokens: {
            idToken: string,
            accessToken: string,
            refreshToken: string,
            expiresIn: number,
            tokenType: string
        }
    }
    export interface RegisterData {
        email: string,
        password: string,
        name: string,
        role: string,
    }
}

export namespace Registration {
    export type FormCreateUserInputs = Omit<User,"id"|"enrollmentStatus">;
    export type IdpCreateUserInputs = Omit<User, "role"|"enrollmentStatus">


}

export namespace PrismaTypes {
    export type ProfessorAttributes = Partial<Professor>;
    export type UserAttributes = Partial<User>
    export type CourseAttributes = Partial<Course>
}

declare global {
    export namespace Express {
        export interface Request {
            body ? : any
            client ? : S3Client
        }
  }}