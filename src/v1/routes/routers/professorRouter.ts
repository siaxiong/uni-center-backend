import express, {} from "express";
import { body } from "express-validator";
import { ProfessorCourseController, AssignmentController } from "../../controllers/controller";
import { requestResultValidator } from "../../utils/requestValidator";
import { UploadPdfMiddleware } from "../../middlewares/UploadPDF";
import { API_Authorization } from "../../middlewares/authorize";
const router = express.Router();


//Keeping this part here so i remember im using multer
//Cant be kept inside the UploadPdfMiddleware
import multer from "multer";
const upload = multer({dest: `${process.cwd}/uploads`});

router.get("/", ProfessorCourseController.getProfessorCourses);
router.post("/",API_Authorization, body(["userId","courseId"]).exists({checkFalsy:true}).bail(),requestResultValidator,ProfessorCourseController.assignProfessorToCourse);
router.delete("/:professorCourseId",API_Authorization, ProfessorCourseController.deleteProfessorCourse);

router.get("/:professorCourseId/assignments",API_Authorization,AssignmentController.getAssignments);

router.get("/:professorCourseId/assignments/:assignmentId/pdf",AssignmentController.getAssignmentPDF);

router.post("/:professorCourseId/assignments",API_Authorization, upload.single("pdfFile"),UploadPdfMiddleware,AssignmentController.createAssignment);
router.put("/:professorCourseId/assignments/:assignmentId",API_Authorization, upload.single("pdfFile"),UploadPdfMiddleware,AssignmentController.updatePdfInAssignment);
router.delete("/:professorCourseId/assignments/:assignmentId",API_Authorization,AssignmentController.deleteAssignment);

export {router as ProfessorRouter};


