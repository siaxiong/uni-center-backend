import {ManagementClient, AuthenticationClient} from "auth0";
import axios from "axios";
import { ENV_API } from "../../../EnvironmentVariables";


export const auth0ManagementClient = new ManagementClient({

	domain: ENV_API.Domain,
	clientId: ENV_API.M2M_ClientID,
	clientSecret: ENV_API.M2M_ClientSecret,	
	audience: ENV_API.Management_API_Audience,
	scope: ENV_API.Management_API_Scopes,
});

export const  authenticationClient = new AuthenticationClient({
	domain: ENV_API.Domain,
	clientId: ENV_API.Web_ClientID,
	clientSecret: ENV_API.Web_ClientSecret,});



