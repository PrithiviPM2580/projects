import {
  getAllUsersController,
  getCurrentUserController,
} from "@/controllers/user.controller";
import { Router } from "express";

const userRouter: Router = Router();

userRouter.get("/", getAllUsersController);

userRouter.get("/me", getCurrentUserController);

// userRouter.get("/search")
// userRouter.get("/:id");

export default userRouter;
