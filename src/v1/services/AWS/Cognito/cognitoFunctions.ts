import {InitiateAuthCommand, SignUpCommand, ConfirmSignUpCommand,
	AdminAddUserToGroupCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import {GetCredentialsForIdentityCommand, GetIdCommand, Credentials} from "@aws-sdk/client-cognito-identity";
import {userPoolClient, identityPoolClient} from "./cognitoClients";

const ACCOUNT_ID = process.env.AWS_ACCOUNT_ID;
const IDENTITY_POOL_ID = process.env.UC_AWS_IDENTITY_POOL_ID;

const USER_POOL_APP_CLIENT_ID = process.env.UC_AWS_USER_POOL_APP_CLIENT_ID;

const USER_POOL_ARN = process.env.UC_AWS_USER_POOL_ARN;

const USER_POOL_ID = process.env.UC_AWS_USER_POOL_ID;

/* getCredential() (which is just logging in) big idea
1. Get a user ID from the Cognito User pool
2. Use that user ID to get a identity ID from the Cognito Identity pool
3. Use both user ID and identity ID in to get AWS credential

*/

const getCredential = async (email : string, password : string) => {
	//Just building the cmd to get the user ID
	const authCMD = new InitiateAuthCommand({
		ClientId: USER_POOL_APP_CLIENT_ID,
		AuthParameters: {
			"USERNAME": email,
			"PASSWORD": password,
		},
		AuthFlow: "USER_PASSWORD_AUTH",
	});
    
	//Using the built cmd above to get the user ID from the user pool
	const user_pool_result = await userPoolClient.send(authCMD);
    
	//Just building the cmd to get the identity ID
	const getIdCMD = new GetIdCommand({
		IdentityPoolId: IDENTITY_POOL_ID,
		AccountId: ACCOUNT_ID,
		Logins: {
			[USER_POOL_ARN as string]: user_pool_result?.AuthenticationResult?.IdToken as string,
		},
	});
        
	//Using the built identity cmd above to get the identity ID from the identity pool
	const identity_pool_result = await identityPoolClient.send(getIdCMD);
    
	const credential = await identityPoolClient.send(new GetCredentialsForIdentityCommand({
		IdentityId: identity_pool_result.IdentityId,
		Logins: {
			[USER_POOL_ARN as string]: user_pool_result?.AuthenticationResult?.IdToken as string,
		},
	}));

	return credential.Credentials;
};

const createAWSAccount = async (email : string, password : string, fullName : string) => {
	const userAttr = [{
		"Name": "name",
		"Value": fullName,
	},
	{
		"Name": "email",
		"Value": email,
	}];

	const signUpCMD = new SignUpCommand({
		"ClientId": USER_POOL_APP_CLIENT_ID,
		"Username": email,
		"Password": password,
		"UserAttributes": userAttr,
	});

	return userPoolClient.send(signUpCMD);
};

const assignUserToGroup = async function(email: string, role: string){
	// const developerClient = await getDeveloperClient(cred);

	new AdminAddUserToGroupCommand({
		GroupName: role.toLocaleLowerCase(),
		UserPoolId: USER_POOL_ID,
		Username: email
	});
	// await developerClient.send(addUserToGroup);
};


const confirmAWSAccount = async (email : string, code : string) => {
	const confirmCMD = new ConfirmSignUpCommand({
		"ClientId": USER_POOL_APP_CLIENT_ID,
		"Username": email,
		"ConfirmationCode": code,
	});
	return userPoolClient.send(confirmCMD);
};

export {getCredential, createAWSAccount, confirmAWSAccount, assignUserToGroup};

