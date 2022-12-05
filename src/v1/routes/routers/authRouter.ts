import express from "express";
import { AuthController } from "../../controllers/controller";
import { body, query } from "express-validator";
import { requestResultValidator } from "../../utils/requestValidator";

const router = express.Router();

router.post("/register", body(["email", "password", "role"]).exists({checkFalsy:true}), requestResultValidator, AuthController.register);
router.post("/login", body(["email","password"]).exists({checkFalsy:true}), requestResultValidator, AuthController.login);

router.post("/ssoLogin", body(["url","code","client_id", "redirect_uri"]).exists({checkFalsy:true}), requestResultValidator, AuthController.ssoLogin);
router.put("/confirm", body(["email", "confirmationCode"]).exists({checkFalsy:true}), requestResultValidator,AuthController.confirm);
router.get("/userExist", query(["email"]).exists({checkFalsy:true}) ,requestResultValidator, AuthController.userExist);

export { router as AuthRouter};




