import { jwtVerify, importJWK } from "jose";
import { ENV_API } from "../../EnvironmentVariables";

export const AuthenticateJWT = async function(jwt: string){

	try {
		const publicKey = await importJWK(ENV_API.JWK.keys[0], "RS256");
		const {payload} = await jwtVerify(jwt, publicKey, {
			issuer: ENV_API.Issuer,
		});
		console.log("🚀 ~ file: authenticateJWT.ts:12 ~ AuthenticateJWT ~ payload", payload);
		
		return payload;
		
	} catch (error) {
		console.log(error);
	}
};
