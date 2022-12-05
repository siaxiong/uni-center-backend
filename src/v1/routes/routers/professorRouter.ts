import express, {} from "express";
import { body } from "express-validator";
import { ProfessorController } from "../../controllers/controller";
import { requestResultValidator } from "../../utils/requestValidator";
const router = express.Router();


router.get("/", ProfessorController.getProfessors);
router.post("/", body(["userId","courseId"]).exists({checkFalsy:true}).bail(),requestResultValidator,ProfessorController.assignProfToCourse);

router.get("/:professorId", ProfessorController.getFilteredProfessors);
router.delete("/:professorId", ProfessorController.deleteProfessors);

export {router as ProfessorRouter};


