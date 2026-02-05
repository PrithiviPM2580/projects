import { Request, Response } from "express";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "@/utils";

export const signupController = async (req: Request, res: Response) => {
  try {
    const { fullName, userName, email, password, gender, profilePicture } =
      req.body;
    const isUserExist = await User.findOne({ $or: [{ email }, { userName }] });
    if (isUserExist) {
      return res
        .status(400)
        .json({ message: "User with this email or username already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const boyPic =
      profilePicture ||
      `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlPic =
      profilePicture ||
      `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const newUser = new User({
      fullName,
      userName,
      email,
      password: hashedPassword,
      gender,
      profilePicture: gender === "Male" ? boyPic : girlPic,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const token = generateToken({ userId: user._id }, res);

    res.status(200).json({
      message: "Login successful",
      user: {
        fullName: user.fullName,
        userName: user.userName,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
