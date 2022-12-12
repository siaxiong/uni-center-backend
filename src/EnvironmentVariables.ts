
export const ENV_API = {
	Domain: process.env.Auth0_Domain as string,
	ClientID: process.env.Auth0_Client_Id as string,
	ClientSecret: process.env.Auth0_Client_Secret as string,
	Audience: process.env.Auth0_API_Audience as string,
	Issuer: process.env.Auth0_API_Issuer as string,
	RoleClaim: process.env.Auth0_API_Role_Claim as string,
};

