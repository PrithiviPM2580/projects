import "dotenv/config";
import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDatabase from "./db/db";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
import { createServer } from "node:http";
import { setupSocket } from "./socket/socket";

const app: Express = express();
const PORT = process.env.PORT || 5000;

const server = createServer(app);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Real-Time Video Calling Server is running!");
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

setupSocket(server);

(async () => {
  try {
    await connectToDatabase();
    server.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
})();
