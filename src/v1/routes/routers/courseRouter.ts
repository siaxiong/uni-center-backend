import express from "express";
import { body } from "express-validator";
import { CourseController } from "../../controllers/controller";
import { requestResultValidator } from "../../utils/requestValidator";

const router = express.Router();

router.get("/", CourseController.getCourses);
router.post("/", body(["name", "description"]).exists({checkFalsy:true}) ,requestResultValidator, CourseController.createCourse);

router.get("/:courseId", CourseController.getFilteredCourses);
router.delete("/:courseId", CourseController.deleteCourse);

export {router as CourseRouter};