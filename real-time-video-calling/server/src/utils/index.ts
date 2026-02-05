import jwt from "jsonwebtoken";
import { Response } from "express";

export const generateToken = (payload: object, res: Response) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};
