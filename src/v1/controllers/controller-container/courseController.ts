import { CourseService } from "../../services/services";
import { catchError } from "../../utils/catchError";
import { checkEmptyValue } from "../../utils/checkDBResult";


export const getCourses = catchError(
	async function(req,res){
		const data = await CourseService.getCourses();
		res.json(data);
	}
);

export const getFilteredCourses = catchError(
	async function(req, res){
		const id = req.params.courseId;

		const data = await CourseService.getFilteredCourses({id});
		res.json(data);
	}
);

export const createCourse = catchError(
	async function (req, res) {
		const {name, description} = req.body;

		const data = await CourseService.createCourse(name, description);
		res.json(data);
	}
);

export const deleteUniqueCourse = catchError(
	async function(req, res) {
		const id = req.params.courseId;

		const data = await CourseService.deleteUniqueCourse(id);
		res.json(data);
	}
);


