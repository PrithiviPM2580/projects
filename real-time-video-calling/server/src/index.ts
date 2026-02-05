import "dotenv/config";
import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app: Express = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Real-Time Video Calling Server is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
