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
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
