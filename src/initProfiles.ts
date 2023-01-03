import { AuthService, UserService } from "./v1/services/services";

export const initProfile = async function(userId:string){
	try {
		//Init admin user
		const data = await UserService.updateUser({enrollmentStatus:"Accepted", id:userId});
		console.log("*** INIT PROFILE SUCCESS! START***");
		console.log(data);
		console.log("*** INIT PROFILE SUCCESS! END ***");
		
	} catch (error) {
		console.log("****INIT PROFILES ERROR****");
		console.log(error);
		console.log("****INIT PROFILES ERROR****");
	}
};