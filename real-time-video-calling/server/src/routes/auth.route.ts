import { Router } from "express";
import {
  signupController,
  loginController,
  logoutController,
} from "@/controllers/auth.controller";
import { isLogin } from "@/middlewares/is-login.middleware";

const authRouter: Router = Router();

authRouter.post("/signup", signupController);

authRouter.post("/login", loginController);

authRouter.post("/logout", isLogin, logoutController);

export default authRouter;
