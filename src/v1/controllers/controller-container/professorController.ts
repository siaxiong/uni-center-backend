import { ProfessorService, UserService, CourseService } from "../../services/services";
import { param, validationResult } from "express-validator";
import { catchError } from "../../utils/catchError";

type ProfessorRecord = {
    id: string
    userId: string
    courseId: string
}


const getProfessors = catchError(
    async function(req, res){
        const professorRecords = await ProfessorService.getAllProfessors();

        const data = await Promise.all(professorRecords.map(async (profRecord: ProfessorRecord) => {
            let courseRecord = await CourseService.getUniqueCourse(profRecord.courseId);
            let userRecord = await UserService.getUniqueUser(profRecord.userId);
            
            courseRecord.courseId = courseRecord.id;
            courseRecord.courseName = courseRecord.name;

            courseRecord.userId = userRecord.id;
            courseRecord.userName = userRecord.name;
            courseRecord.userEmail = userRecord.email;

            //professorId != userId
            //professorId is an instance id of a record in the Professor table
            courseRecord.professorId = profRecord.id;

            delete courseRecord["id"];
            delete courseRecord["name"];

            console.log(courseRecord);
            return courseRecord;
        }))
        
        res.json(data);
    }
)

const getUniqueProfessor = catchError(
    async function(req, res){
        const id = req.params.professorId;

        const profRecord = await ProfessorService.getUniqueProfessor(id);
        const userRecord = await UserService.getUniqueUser(profRecord.userId);
        let courseRecord = await CourseService.getUniqueCourse(profRecord.courseId);

        courseRecord.courseId = courseRecord.id;
        courseRecord.courseName = courseRecord.name;

        courseRecord.userId = userRecord.id;
        courseRecord.userName = userRecord.name;
        courseRecord.userEmail = userRecord.email;

        //professorId != userId
        //professorId is an id of a record instance in the Professor table
        courseRecord.professorId = profRecord.id;

        delete courseRecord["id"];
        delete courseRecord["name"];

        res.json(courseRecord);
    }
)


const assignProfToCourse = catchError(
    async function(req, res){
        const {userId, courseId} : {userId: string, courseId: string} = req.body;
        let data:any;

        const userRecord = await UserService.getUniqueUser(userId as string);
        const courseRecord = await CourseService.getUniqueCourse(courseId as string);

        data = await ProfessorService.createProfessorRecord({userId, courseId});

        res.json(data);

    }
)

const deleteUniqueProfessor = catchError(
    async function(req, res){
        const id = req.params.professorId;
        const data = await ProfessorService.deleteUniqueProfessor(id);
        res.json(data);
    }
)


//GET
export {getProfessors, getUniqueProfessor}

//POST
export {assignProfToCourse}

//DELETE
export {deleteUniqueProfessor}