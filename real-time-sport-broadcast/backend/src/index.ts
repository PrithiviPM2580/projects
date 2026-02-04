import express, { Request, Response } from "express";
import http from "node:http";
import matchRouter from "./routes/matches";
import commentryRouter from "./routes/commentry";
import { setupWebSocketServer } from "./ws/server";

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "0.0.0.0";

const app = express();
const server = http.createServer(app);

// JSON middleware
app.use(express.json());

// Root GET route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to Real-Time Sport Broadcast API!" });
});

app.use("/matches", matchRouter);
app.use("/commentry", commentryRouter);

const { broadcastMatchCreated } = setupWebSocketServer(server);
app.locals.broadcastMatchCreated = broadcastMatchCreated;

// Start server
server.listen(PORT, HOST, () => {
  const baseUrl =
    HOST === "0.0.0.0" ? `http://localhost:${PORT}` : `http://${HOST}:${PORT}`;
  console.log(`Server is running on ${baseUrl}`);
  console.log(
    `WebSocket server is running on ${baseUrl.replace("http", "ws")}/ws`,
  );
});
