import {
  getAllUsersController,
  getCurrentUserController,
} from "@/controllers/user.controller";
import { isLogin } from "@/middlewares/is-login.middleware";
import { Router } from "express";

const userRouter: Router = Router();

userRouter.get("/", isLogin, getAllUsersController);

userRouter.get("/me", isLogin, getCurrentUserController);

// userRouter.get("/search")
// userRouter.get("/:id");

export default userRouter;
