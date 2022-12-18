import express from "express";
import { query } from "express-validator";
import { UserController } from "../../controllers/controller";
import { requestResultValidator } from "../../utils/requestValidator";
import { API_Authorization } from "../../middlewares/authorize";
import { ValidateUserRoute } from "../../middlewares/RouterValidators";
const router = express.Router();

router.get("/", API_Authorization, query(["role","enrollmentStatus"]).optional().exists({checkFalsy:true}),requestResultValidator, UserController.getUsers);
router.put("/:userId", ValidateUserRoute.PUT_METHOD, UserController.updateUser);
router.get("/:userId",API_Authorization, UserController.getUsers);
router.delete("/:userId",API_Authorization, UserController.deleteUniqueUser);


export {router as UserRouter};