import express from "express";
import { query } from "express-validator";
import { UserCourseController } from "../../controllers/controller";
import { requestResultValidator } from "../../utils/requestValidator";
import { API_Authorization } from "../../middlewares/authorize";
import { ValidateUserRoute } from "../../middlewares/RouterValidators";
const router = express.Router();

router.get("/", API_Authorization, query(["role","enrollmentStatus"]).optional().exists({checkFalsy:true}),requestResultValidator, UserCourseController.getUsers);
router.put("/:userId", ValidateUserRoute.PUT_METHOD, UserCourseController.updateUser);
router.delete("/:userId",API_Authorization, UserCourseController.deleteUser);


export {router as UserRouter};