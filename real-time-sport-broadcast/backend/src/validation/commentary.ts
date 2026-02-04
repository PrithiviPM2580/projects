import { z } from "zod";

export const matchIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const listCommentaryQuerySchema = z.object({
  limit: z.coerce.number().positive().max(100).optional(),
});

export const createCommentarySchema = z.object({
  minute: z.number().int().nonnegative(),
  sequence: z.number().int().optional(),
  period: z.string().min(1, "Period is required").optional(),
  eventType: z.string().min(1, "Event type is required").optional(),
  actor: z.string().optional(),
  team: z.string().optional(),
  message: z.string().min(1, "Message is required"),
  metadata: z.record(z.string(), z.any()).optional(),
  tags: z.array(z.string()).optional().default([]),
});

export type MatchIdParam = z.infer<typeof matchIdParamSchema>;
export type ListCommentaryQuery = z.infer<typeof listCommentaryQuerySchema>;
export type CreateCommentary = z.infer<typeof createCommentarySchema>;
