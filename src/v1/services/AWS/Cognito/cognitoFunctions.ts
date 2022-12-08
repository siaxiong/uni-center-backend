import {InitiateAuthCommand, SignUpCommand, ConfirmSignUpCommand,
	AdminAddUserToGroupCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import {userPoolClient} from "./cognitoClients";

const USER_POOL_APP_CLIENT_ID = process.env.UC_AWS_USER_POOL_APP_CLIENT_ID;
const USER_POOL_ID = process.env.UC_AWS_USER_POOL_ID;

/* getAuthTokens() (which is just logging in) big idea
1. Get a user ID from the Cognito User pool
2. Use that user ID to get a identity ID from the Cognito Identity pool
3. Use both user ID and identity ID in to get AWS credential

*/

const signIn = async (email : string, password : string) => {
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
	const data = await userPoolClient.send(authCMD);

	if(!data) throw new Error("AWS Sign In Error");


	return {
		idToken: data.AuthenticationResult?.IdToken,
		accessToken: data.AuthenticationResult?.AccessToken,
		refreshToken: data.AuthenticationResult?.RefreshToken,
		expiresIn: data.AuthenticationResult?.ExpiresIn,
		tokenType: data.AuthenticationResult?.TokenType
	};
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

export {signIn, createAWSAccount, confirmAWSAccount, assignUserToGroup};

