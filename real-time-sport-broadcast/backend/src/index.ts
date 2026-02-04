import express, { Request, Response } from "express";
import http from "node:http";
import cors from "cors";
import matchRouter from "./routes/matches";
import commentryRouter from "./routes/commentry";
import { setupWebSocketServer } from "./ws/server";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "0.0.0.0";

const app = express();
const server = http.createServer(app);

app.all("/api/auth/{*splat}", toNodeHandler(auth));

// JSON middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Root GET route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to Real-Time Sport Broadcast API!" });
});

app.use("/matches", matchRouter);
app.use("/matches/:id/commentary", commentryRouter);

const { broadcastMatchCreated, broadcastCommentary } =
  setupWebSocketServer(server);
app.locals.broadcastMatchCreated = broadcastMatchCreated;
app.locals.broadcastCommentary = broadcastCommentary;

// Start server
server.listen(PORT, HOST, () => {
  const baseUrl =
    HOST === "0.0.0.0" ? `http://localhost:${PORT}` : `http://${HOST}:${PORT}`;
  console.log(`Server is running on ${baseUrl}`);
  console.log(
    `WebSocket server is running on ${baseUrl.replace("http", "ws")}/ws`,
  );
});
