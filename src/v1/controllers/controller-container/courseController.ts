import { CourseService } from "../../services/services";
import { Response, Request } from "express";

export const getCourses = async function(req:Request,res:Response){
	const data = await CourseService.getCourses();
	res.json(data);
};

export const getFilteredCourses = async function(req: Request, res: Response){
	const id = req.params.courseId;

	const data = await CourseService.getFilteredCourses({id});
	res.json(data);
};

export const createCourse = async function (req: Request, res: Response) {
	const {name, description} = req.body;

	const data = await CourseService.createCourse(name, description);
	res.json(data);
};

export const deleteUniqueCourse = async function(req: Request, res: Response) {
	const id = req.params.courseId;

	const data = await CourseService.deleteUniqueCourse(id);
	res.json(data);
};


