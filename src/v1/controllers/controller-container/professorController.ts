import { ProfessorService, UserService, CourseService } from "../../services/services";
import { catchError } from "../../utils/catchError";
import {PrismaTypes} from "../../../CustomTypes";
import {Professor, Course, User} from "@prisma/client";


const getCombinedUserProfessorCourseRecord = function(user: User, professor: Professor, course: Course){
	const combinedRecord : {[key: string]:string} = {};

	combinedRecord.courseId = course.id;
	combinedRecord.courseName = course.name;
	combinedRecord.description = course.description;

	combinedRecord.userId = user.id;
	combinedRecord.userName = user.name;
	combinedRecord.userEmail = user.email;

	combinedRecord.professorId = professor.id;

	return combinedRecord;
};

export const getProfessors = catchError(
	async function(req, res){
		const professorRecords = await ProfessorService.getProfessors();
		
		const data = await Promise.all(professorRecords.map(async (profRecord: Professor) => {
			console.log("🚀 ~ file: professorController.ts:18 ~ data ~ profRecord", profRecord);
			const courseRecord = (await CourseService.getFilteredCourses({id: profRecord.courseId}))[0];
			const userRecord = (await UserService.getFilteredUsers({id:profRecord.userId}))[0];

			return getCombinedUserProfessorCourseRecord(userRecord,profRecord,courseRecord);
		}));
        
		res.json(data);
	}
);

export const getFilteredProfessors = catchError(
	async function(req, res){
		const payload: PrismaTypes.ProfessorAttributes  = JSON.parse(req.params.query);
		console.log("🚀 ~ file: professorController.ts:42 ~ function ~ payload", JSON.stringify(payload));

		const profRecord = (await ProfessorService.getFilteredProfessors(payload))[0];
		const userRecord = (await UserService.getFilteredUsers({id:profRecord.userId}))[0];
		const courseRecord = (await CourseService.getFilteredCourses({id:profRecord.courseId}))[0];

		res.json(getCombinedUserProfessorCourseRecord(userRecord,profRecord,courseRecord));
	}
);


export const assignProfToCourse = catchError(
	async function(req, res){
		const {userId, courseId} : {userId: string, courseId: string} = req.body;

		await UserService.getFilteredUsers({id:userId});
		await CourseService.getFilteredCourses({id: courseId});

		const data = await ProfessorService.createProfessorRecord({userId, courseId});

		res.json(data);

	}
);

export const deleteProfessors = catchError(
	async function(req, res){
		const professorId = req.params.professorId;
		const data = await ProfessorService.deleteProfessors({id: professorId});
		res.json(data);
	}
);

