
type AsyncFunction = (arg:Promise<any>)=>void;


//ONLY used for checking database queries result for empty results
//The ORM Prisma will return null if no results were found, thus
//there wont be a case of an array containing an empty object (this
// scenerio would pass the test below)
const checkEmptyValue = async function(arg: Promise<any>){
   const result = await arg;
   console.log("🚀 ~ file: checkEmptyValue.ts ~ line 6 ~ checkEmptyValue ~ result", result)
   
   if(result === "" ||
   result === null ||
   result === undefined ||
   result?.length == 0) throw new Error("Records associated with your request were not found!")

   
   return result;
}

export {checkEmptyValue};