import express,{Response, Request, NextFunction} from "express";
import { CourseService, ProfessorService, UserService } from "../../services/services";
import { catchError } from "../../utils/catchError";


const getCourses = catchError(
    async function(req,res){
        const data = await CourseService.getAllCourses();
        res.json(data);
    }
)

const getUniqueCourse = catchError(
    async function(req, res){
        const id = req.params.courseId;

        const data = await CourseService.getUniqueCourse(id);
        res.json(data);
    }
)

const createCourse = catchError(
    async function (req, res) {
        const {name, description} = req.body;

        const data = await CourseService.createCourse(name, description);
        res.json(data);
    }
)

const deleteUniqueCourse = catchError(
    async function(req, res) {
        const id = req.params.courseId;

        const data = await CourseService.deleteUniqueCourse(id);
        res.json(data);
    }
)


export {getCourses,getUniqueCourse, createCourse, deleteUniqueCourse}