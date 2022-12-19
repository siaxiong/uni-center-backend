import express from "express";
import { body, query } from "express-validator";
import { requestResultValidator } from "../../utils/requestValidator";
import { AuthController } from "../../controllers/controller";

const router = express.Router();

router.post("/register", body(["email", "name", "sub", "password", "role"]), requestResultValidator, AuthController.register);
router.post("/login", body(["email","password"]).exists({checkFalsy:true}), requestResultValidator, AuthController.login);
router.post("/tokens", body(["url","code","client_id", "redirect_uri"]).exists({checkFalsy:true}), requestResultValidator, AuthController.getAuthTokens);
router.get("/userExist", query(["email"]).exists({checkFalsy:true}) ,requestResultValidator, AuthController.userExist);

export { router as AuthRouter};




