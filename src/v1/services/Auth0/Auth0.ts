import {ManagementClient, AuthenticationClient} from "auth0";
import axios from "axios";

const Auth0_Domain = process.env.Auth0_Domain as string;

const Auth0_Client_Id = process.env.Auth0_Client_Id as string;
const Auth0_Client_Secret = process.env.Auth0_Client_Secret as string;

export const getAccessToken = async function(){
	axios({method:"POST", url:"https://university-center.us.auth0.com/oauth/token",data:{
		grant_type: "client_credentials",
		domain: "university-center.us.auth0.com",
		client_id: "Emr9WsYxl8u9AlANE3lkNDSA9h8KOK6r",
		client_secret: "Emr9WsYxl8u9AlANE3lkNDSA9h8KOK6r",
		audience: "https://university-center.us.auth0.com/api/v2/"
	}})
		.then(resp=>console.log(resp));
};



export const auth0ManagementClient = new ManagementClient({
	domain: "university-center.us.auth0.com",
	clientId: "Emr9WsYxl8u9AlANE3lkNDSA9h8KOK6r",
	clientSecret: "QPlI-4ZB6YmZ1shjR3jMfgxpLKGPJjvQmKOJ1yTsziNewsqOB9aXnSwjS5mSpC-N",
	audience:"https://university-center.us.auth0.com/api/v2/",
	scope: "create:users update:users read:users delete:users"
});

export const  authenticationClient = new AuthenticationClient({
	domain: "university-center.us.auth0.com",
	clientId: "Of5Nq2d8uu7rVbvUn6RD1uSz4vZI06XQ",
	clientSecret: "Ls4wSBNmTNGllJUu17cne26sCOCoL9FphtC0amGdvXtcPOf0QXaSYC6Dlqs_dzkO",
});



