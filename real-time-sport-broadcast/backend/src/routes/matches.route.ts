import { Router } from "express";
import type { Request, Response } from "express";

const matchRouter: Router = Router();

matchRouter.get("/", (req: Request, res: Response) => {
  res.json({ message: "Match route works!" });
});

export default matchRouter;
