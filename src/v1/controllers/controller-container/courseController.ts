import { CourseService } from "../../services/services";
import { Response, Request } from "express";

export const getCourses = async function(req:Request,res:Response){
	const data = await CourseService.getCourses();
	res.json(data);
};

export const getFilteredCourses = async function(req: Request, res: Response){
	const id = req.params.courseId;

	const data = await CourseService.getFilteredCourses({id});
	// console.log("data: ", data);
	res.json(data);
};

export const createCourse = async function (req: Request, res: Response) {
	const {name, description} = req.body;

	const data = await CourseService.createCourse(name, description);
	res.json(data);
};

export const deleteCourse = async function(req: Request, res: Response) {
	const id = req.params.courseId;

	const data = await CourseService.deleteCourse(id);
	res.json(data);
};


