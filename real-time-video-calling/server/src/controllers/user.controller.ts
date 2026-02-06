import User from "@/models/user.model";
import { Request, Response } from "express";

export const getAllUsersController = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const users = await User.find(
      { _id: { $ne: userId } },
      "profilePicture email username",
    );

    res.status(200).json(users);
    console.log("Fetched users:", users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCurrentUserController = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const user = await User.findById(
      userId,
      "profilePicture email username fullName",
    ).lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
