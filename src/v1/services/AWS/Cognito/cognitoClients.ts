
import {CognitoIdentityProviderClient} from "@aws-sdk/client-cognito-identity-provider";
import {CognitoIdentityClient} from "@aws-sdk/client-cognito-identity";

const REGION = process.env.AWS_REGION;

const userPoolClient = new CognitoIdentityProviderClient({
	region: REGION,
});


const identityPoolClient = new CognitoIdentityClient({
	region: REGION,
});

export {userPoolClient, identityPoolClient};