
const {CognitoIdentityProviderClient} = require("@aws-sdk/client-cognito-identity-provider");
const {CognitoIdentityClient} = require("@aws-sdk/client-cognito-identity");

const REGION = process.env.AWS_REGION;
const USER_POOL_APP_CLIENT_SECRET= process.env.AWS_USER_POOL_APP_CLIENT_SECRET;

const userPoolClient = new CognitoIdentityProviderClient({
    region: REGION,
});


const identityPoolClient = new CognitoIdentityClient({
    region: REGION,
});

export {userPoolClient, identityPoolClient};