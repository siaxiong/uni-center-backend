import express from "express";
import { body, validationResult } from 'express-validator';
import { CourseController } from "../../controllers/controller";
import { requestResultValidator } from "../../utils/requestValidator";

const router = express.Router();

router.get("/", CourseController.getCourses);
router.post("/", body(["name", "description"]).exists({checkFalsy:true}) ,requestResultValidator, CourseController.createCourse);

router.get("/:courseId", CourseController.getUniqueCourse);
router.delete("/:courseId", CourseController.deleteUniqueCourse)

export {router as CourseRouter}