import { db } from "@/db/db";
import { commentary } from "@/db/schema";
import {
  createCommentarySchema,
  matchIdParamSchema,
} from "@/validation/commentary";
import { Router } from "express";
import type { Request, Response } from "express";

const commentryRouter: Router = Router({ mergeParams: true });

commentryRouter.post("/", async (req: Request, res: Response) => {
  const paramsValidation = matchIdParamSchema.safeParse(req.params);

  if (!paramsValidation.success) {
    return res.status(400).json({
      error: "Invalid match ID",
      details: JSON.stringify(paramsValidation.error.issues),
    });
  }

  const bodyResult = createCommentarySchema.safeParse(req.body);
  if (!bodyResult.success) {
    return res.status(400).json({
      error: "Invalid request body",
      details: JSON.stringify(bodyResult.error.issues),
    });
  }

  try {
    const { minute, ...rest } = bodyResult.data;
    const [result] = await db
      .insert(commentary)
      .values({
        matchId: paramsValidation.data.id,
        minute,
        ...rest,
      })
      .returning();
    return res.status(201).json({ data: result });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default commentryRouter;
