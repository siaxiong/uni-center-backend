import express from "express";
import { UploadPdfMiddleware } from "../../middlewares/UploadPDF";
import { API_Authorization } from "../../middlewares/authorize";
import { AssignmentSubmissionController, StudentCourseController } from "../../controllers/controller";


const router = express.Router();
//Keeping this part here so i remember im using multer
//Cant be kept inside the UploadPdfMiddleware
import multer from "multer";
const upload = multer({dest: `${process.cwd}/uploads`});


router.get("/",API_Authorization, StudentCourseController.getStudentCourses);
router.get("/:studentCourseId/assignmentSubmissions/:assignmentSubmissionId/pdf", AssignmentSubmissionController.getAssignmentSubmissionPDF);
router.get("/:studentCourseId/assignmentSubmissions",API_Authorization, AssignmentSubmissionController.getCourseAssignmentSubmissions);
router.put("/:studentCourseId/assignmentSubmissions/:assignmentSubmissionId",API_Authorization,upload.single("pdfFile") ,UploadPdfMiddleware, AssignmentSubmissionController.updatePDFInAssignmentSubmission);
router.post("/",API_Authorization, StudentCourseController.createStudentCourse);
router.delete("/:studentCourseId", StudentCourseController.deleteStudentCourse);

export {router as StudentCourseRouter};