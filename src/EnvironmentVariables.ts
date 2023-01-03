


//********FOR PRODUCTION*********
import jwksProd from "./jwks.json";
export const ENV_API = {
	Domain: process.env.Prod_Auth0_Domain as string,
	TokenEndpoint: process.env.Prod_Auth0_API_Token_Endpoint as string,
	Web_ClientID: process.env.Prod_Auth0_Web_Client_Id as string,
	Web_ClientSecret: process.env.Prod_Auth0_Web_Client_Secret as string,
	M2M_ClientID: process.env.Prod_Auth0_M2M_Client_Id as string,
	M2M_ClientSecret: process.env.Prod_Auth0_M2M_Client_Secret as string,
	Management_API_Audience: process.env.Prod_Auth0_Management_API_Audience as string,
	UniCenter_API_Audience: process.env.Prod_Auth0_UniCenter_API_Audience as string,
	Issuer: process.env.Prod_Auth0_API_Issuer as string,
	RoleClaim: process.env.Prod_Auth0_API_Role_Claim as string,
	Connection: process.env.Prod_Auth0_API_DB_Connection as string,
	Auth0_DB_URL: process.env.Prod_Auth0_API_DB_URL as string,
	AdminRoleID: process.env.Prod_Auth0_API_AdminRoleID as string,
	ProfessorRoleID: process.env.Prod_Auth0_API_ProfessorRoleID as string,
	StudentRoleID: process.env.Prod_Auth0_API_StudentRoleID as string,
	Management_API_Scopes: process.env.Prod_Auth0_Management_API_Scopes as string,
	JWK: jwksProd,
	Code_Verifier: process.env.Code_Verifier as string,
};


//     READ ME !!!!!
/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
/* CHANGE DATABASE URL IN ENV FILE*/
/* WHEN SWITCHING ENVIRONMENT */
/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/


//********FOR DEVELOPEMENT*********
// import jwksDev from "./dev-jwks.json";
// export const ENV_API = {
// 	Domain: process.env.Dev_Auth0_Domain as string,
// 	TokenEndpoint: process.env.Dev_Auth0_API_Token_Endpoint as string,
// 	Web_ClientID: process.env.Dev_Auth0_Web_Client_Id as string,
// 	Web_ClientSecret: process.env.Dev_Auth0_Web_Client_Secret as string,
// 	M2M_ClientID: process.env.Dev_Auth0_M2M_Client_Id as string,
// 	M2M_ClientSecret: process.env.Dev_Auth0_M2M_Client_Secret as string,
// 	Management_API_Audience: process.env.Dev_Auth0_Management_API_Audience as string,
// 	UniCenter_API_Audience: process.env.Dev_Auth0_UniCenter_API_Audience as string,
// 	Issuer: process.env.Dev_Auth0_API_Issuer as string,
// 	RoleClaim: process.env.Dev_Auth0_API_Role_Claim as string,
// 	Connection: process.env.Dev_Auth0_API_DB_Connection as string,
// 	Auth0_DB_URL: process.env.Dev_Auth0_API_DB_URL as string,
// 	AdminRoleID: process.env.Dev_Auth0_API_AdminRoleID as string,
// 	ProfessorRoleID: process.env.Dev_Auth0_API_ProfessorRoleID as string,
// 	StudentRoleID: process.env.Dev_Auth0_API_StudentRoleID as string,
// 	Management_API_Scopes: process.env.Dev_Auth0_Management_API_Scopes as string,
// 	JWK: jwksDev,
// 	Code_Verifier: process.env.Code_Verifier as string,
// };