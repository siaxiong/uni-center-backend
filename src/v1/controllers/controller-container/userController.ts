import express, {Response, Request, NextFunction} from "express";
import { catchError } from "../../utils/catchError";
import { UserService, ProfessorService, CourseService } from "../../services/services";

interface UserRecord{
    id?: string,
    name?: string,
    email?: string,
    role?: string,
    aws_confirmed?: boolean,
    enrolled?: string,
}

type ProfessorRecord = {
    id: string
    userId: string
    courseId: string
}
const getUsers = catchError(
    async function(req, res){
        let payload: UserRecord = req.query; 
        let data:any;


        if(payload){
            if(payload?.aws_confirmed){
                if(payload.aws_confirmed && true) payload.aws_confirmed = true
                if(payload.aws_confirmed && false) payload.aws_confirmed = false
            }
            if(payload?.role) payload.role = (payload.role).toUpperCase();
            data = await UserService.getFilteredUsers(payload);
        }else {
            data = await UserService.getUsers();
        }

        //getFilteredUsers will return an empty [] if no attribute(s) are provide
        //getUsers will return all users and doesnt rely on a attribute to
        //search for all users.
        //both are similar but there is a imortant subtle difference

        res.json(data);
    }
)

const getUniqueUser = catchError(
    async function(req,res){
        const id = req.params.userId;

        const data = await UserService.getUniqueUser(id);
        res.json(data);
    }
)

//Remember that the Student and Professor table hold records for courses that they are taking/teaching
//The User table hold records about a user's role 
// const getUsersCourses = catchError(
//     async function(req, res){
//         const userId = req.params.userId;
//         let data:any;

//         const userRecord = await UserService.getUniqueUser(userId);
//         if(userRecord.role === "PROFESSOR") {
//             const professorRecords = await ProfessorService.getFilteredProfessors({userId});
//             await Promise.all(professorRecords.map((record: ProfessorRecord)=>CourseService.getUniqueCourse(record.courseId)))
//             .then(output=>data=output)
//         // if(userRecord.role === "STUDENT") data = await StudentService.getFilteredStudents({userId})
//         //the above "if "statement for "STUDENT" is a placeholder and not implemented yet
//         }
//         res.json(data);
//     }
// )


//NOT USING AT THE MOMENT
const updateUser = catchError(
    async function(req,res){
        const id = req.params.userId;
        let payload: UserRecord = req.body;
        console.log("🚀 ~ file: userController.ts ~ line 57 ~ function ~ payload", payload)
        let data:any;


        if(payload){
            if(payload?.aws_confirmed){
                if(payload.aws_confirmed && true) payload.aws_confirmed = true
                if(payload.aws_confirmed && false) payload.aws_confirmed = false
            }
            if(payload?.role) payload.role = (payload.role).toUpperCase();

            payload.id = id;
            data = await UserService.updateUser(payload);
            console.log("🚀 ~ file: userController.ts ~ line 76 ~ data", data)
            res.json(data);
        }else{
            throw new Error("Missing attributes to update!")
        }
    }
)


//If the user role is a professor, then a Professor record will be created
//this means the professor is teaching that course.

//If the user role is student, then a Student record will be created
//this means the student is taking that course. 
// const assignUsersCourses = catchError(
//     async function(req, res){
//         const userId = req.params.userId;
//         const courseId = req.params.courseId;
//         let data:any;
        
//         console.log(`userId: ${userId}`)
//         console.log(`courseId: ${courseId}`)

//         console.log("assignUsersCourses()")
//         const userRecord = await UserService.getUniqueUser(userId);


//         if(userRecord.role === "PROFESSOR") data = await ProfessorService.createProfessorRecord({userId, courseId});
//         // if(userRecord.role === "STUDENT") data = await StudentService.createStudentRecord
//         //the above "if "statement for "STUDENT" is a placeholder and not implemented yet

//         res.json(data);

//     }
// )

const deleteUniqueUser = catchError(
    async function(req,res){
        const id = req.params.userId;

        const data = await UserService.deleteUniqueUser(id);
        res.json(data);
    }
)



//GET
export {getUsers, getUniqueUser}

//PUT
export {updateUser}

//POST
// export {assignUsersCourses, assignUsersAssignments}

//DELETE
export {deleteUniqueUser}
