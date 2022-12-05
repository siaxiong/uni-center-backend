


//ONLY used for checking database queries result for empty results
//The ORM Prisma will return null if no results were found, thus
//there wont be a case of an array containing an empty object (this
// scenerio would pass the test below)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const checkEmptyValue = async function<Type>(arg: Promise<Type>):Promise<Type>{
	const result = await arg;
	console.log("🚀 ~ file: checkDBResult.ts:12 ~ result", JSON.stringify(result));

	const consoleError = function(badResult: any){
		console.log("*****SHOW checkEmptyValue() START ********");
		console.log(badResult);
		console.log("*****SHOW checkEmptyValue() END **********");

	};


	// if(!result) {
	// 	consoleError(result);
	// 	throw new Error("Records associated with your request were not found!");
	// }
	// if(Array.isArray(result) && result.length == 0) {
	// 	consoleError(result);
	// 	throw new Error("Records associated with your request were not found!");}
	// if(typeof result === "object" && Object.keys(result).length === 0) {
	// 	consoleError(result);
	// 	throw new Error("Records associated with your request were not found!");
	// }

	return result;
};

export {checkEmptyValue};