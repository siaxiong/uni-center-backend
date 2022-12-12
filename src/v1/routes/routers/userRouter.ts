import express from "express";
import { query } from "express-validator";
import { UserController } from "../../controllers/controller";
import { requestResultValidator } from "../../utils/requestValidator";

const router = express.Router();

router.get("/", query(["role","enrollmentStatus"]).optional().exists({checkFalsy:true}),requestResultValidator, UserController.getUsers);
router.put("/:userId", UserController.updateUser);
router.get("/:userId", UserController.getUsers);
router.delete("/:userId", UserController.deleteUniqueUser);


export {router as UserRouter};