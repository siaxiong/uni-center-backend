import express, {Response, Request, NextFunction} from "express";
import { body, check, param,CustomValidator } from 'express-validator';
import { ProfessorController } from "../../controllers/controller";
import { requestResultValidator } from "../../utils/requestValidator";
const router = express.Router();


router.get("/", ProfessorController.getProfessors);
router.post("/", body(["userId","courseId"]).exists({checkFalsy:true}).bail(),requestResultValidator,ProfessorController.assignProfToCourse)

router.get("/:professorId", ProfessorController.getUniqueProfessor);
router.delete("/:professorId", ProfessorController.deleteUniqueProfessor);

export {router as ProfessorRouter};


