import { db } from "@/db/db";
import { matches } from "@/db/schema";
import { getMatchStatus } from "@/utils/match-status";
import { createMatchSchema } from "@/validation/matches";
import { Router } from "express";
import type { Request, Response } from "express";

const matchRouter: Router = Router();

matchRouter.get("/", (req: Request, res: Response) => {
  res.json({ message: "Match route works!" });
});

matchRouter.post("/", async (req: Request, res: Response) => {
  const parsed = createMatchSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid payload",
      details: JSON.stringify(parsed.error),
    });
  }

  try {
    const [event] = await db
      .insert(matches)
      .values({
        ...parsed.data,
        startTime: new Date(parsed.data.startTime),
        endTime: new Date(parsed.data.endTime),
        homeScore: parsed.data.homeScore ?? 0,
        awayScore: parsed.data.awayScore ?? 0,
        status: getMatchStatus(parsed.data.startTime, parsed.data.endTime)!,
      })
      .returning();

    return res.status(201).json({ data: event });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default matchRouter;
