import { jwtVerify, importJWK } from "jose";
import jwks from "./jwks.json";
import { ENV_API } from "../../EnvironmentVariables";

export const AuthenticateJWT = async function(jwt: string){

	const publicKey = await importJWK(jwks.keys[0], "RS256");
	const {payload} = await jwtVerify(jwt, publicKey, {
		issuer: ENV_API.Issuer,
	});
	console.log("🚀 ~ file: authenticateJWT.ts:12 ~ AuthenticateJWT ~ payload", payload);
	
	return payload;
};
