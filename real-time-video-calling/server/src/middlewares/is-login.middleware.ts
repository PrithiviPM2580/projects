import { NextFunction, Request, Response } from "express";
import User from "@/models/user.model";
import jwt from "jsonwebtoken";

export const isLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token =
      req.cookies.jwt ||
      req.headers.authorization?.split(" ")[1] ||
      req.headers.cookie
        ?.split(";")
        .find((cookie) => cookie.startsWith("jwt="))
        ?.split("=")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as {
      id: string;
    };

    if (!decode) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(decode.id).lean();

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.userId = user._id.toString();

    next();
  } catch (error) {
    console.error("Error in isLogin middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
