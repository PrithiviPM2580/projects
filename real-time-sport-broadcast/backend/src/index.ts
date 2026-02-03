import express, { Request, Response } from "express";
import matchRouter from "./routes/matches.route";

const app = express();
const PORT = process.env.PORT || 3000;

// JSON middleware
app.use(express.json());

// Root GET route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to Real-Time Sport Broadcast API!" });
});

app.use("/matches", matchRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
