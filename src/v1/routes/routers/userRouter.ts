import express from "express";
import { query, body } from "express-validator";
import { UserController } from "../../controllers/controller";
import { requestResultValidator } from "../../utils/requestValidator";

const router = express.Router();



router.get("/", query(["role","aws_confirmed","enrolled"]).optional().exists({checkFalsy:true}),requestResultValidator, UserController.getUsers);

router.get("/:userId", UserController.getUniqueUser);
router.put("/:userId", body(["aws_confirmed", "enrolled", "name", "role"]).optional().exists({checkFalsy:true}) , requestResultValidator, UserController.updateUser)
router.delete("/:userId", UserController.deleteUniqueUser);


export {router as UserRouter}