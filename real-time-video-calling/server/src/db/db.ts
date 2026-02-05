import mongoose from "mongoose";

const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to MongoDB database");
  } catch (error) {
    console.error("Error connecting to MongoDB database:", error);
    throw error;
  }
};

export default connectToDatabase;
