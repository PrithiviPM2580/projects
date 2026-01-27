import type { NextFunction, Request, Response } from "express";
import { User } from "../model/user.model.js";

export async function registeruser(req: Request, res: Response) {
  try {
    const { name, email, password, role } = req.body as RegisterBody;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(409).json({ message: "User already exists" });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      role,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.log("Error in user registration:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
