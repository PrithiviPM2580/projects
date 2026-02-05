import { getAllUsersController } from "@/controllers/user.controller";
import { Router } from "express";

const userRouter: Router = Router();

userRouter.get("/", getAllUsersController);

// userRouter.get("/search")
// userRouter.get("/:id");

export default userRouter;
