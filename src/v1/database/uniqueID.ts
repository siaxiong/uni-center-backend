import prismaClient from "./prismaClient";


export const createUniqueID = async function(tableName: string){
    let id = Math.random().toString(36).substring(2,7).toUpperCase();

    const resp = await prismaClient[tableName].findUnique({
        where: {
            id
        }
    })

    return resp ? null : id;

    // switch(tableName){
    //     case "USER":
    //             const resp = await prismaClient.User.findUnique({
    //                 where: {
    //                     id
    //                 }
    //             })
    //             return resp ? null : id;
    //     case "ADMIN":
    //             const resp  = await prismaClient.Admin.findUnique({
    //                 where: {
    //                     id
    //                 }
    //             })
                
    //             return resp ? null : id;

    //         break;
    //     case "PROFESSOR":
    //         try {
    //             const resp  = await prismaClient.Professor.findUnique({
    //                 where: {
    //                     id
    //                 }
    //             })
                
    //             return resp ? null : id;

    //         }catch(e){
    //             console.log(e)
    //             return null;
    //         }
    //         break;
    //     case "STUDENT":
    //         try {
    //             const resp  = await prismaClient.Student.findUnique({
    //                 where: {
    //                     id
    //                 }
    //             })
                
    //             return resp ? null : id;

    //         }catch(e){
    //             console.log(e)
    //             return null;
    //         }
    //         break;
    //     case "COURSE":
    //         try {
    //             const resp  = await prismaClient.Course.findUnique({
    //                 where: {
    //                     id
    //                 }
    //             })
                
    //             return resp ? null : id;

    //         }catch(e){
    //             console.log(e)
    //             return null;
    //         }
    //         break;
    //     default:
    //         return null;
    // }

}