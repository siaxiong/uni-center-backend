import {ManagementClient, AuthenticationClient} from "auth0";
import axios from "axios";
import { ENV_API } from "../../../EnvironmentVariables";

// console.log(ENV_API);



// export const getAccessToken = async function(){
// 	axios({method:"POST", url:ENV_API.TokenEndpoint,
// 		data:{
// 			grant_type: "client_credentials",
// 			domain: ENV_API.Domain,
// 			client_id: ENV_API.M2M_ClientID,
// 			client_secret: ENV_API.M2M_ClientSecret,
// 			audience: ENV_API.Audience
// 		}})
// 		.then(resp=>console.log(resp));
// };



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



