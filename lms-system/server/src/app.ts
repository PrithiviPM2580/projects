import express, { type Express } from "express";
import routes from "./routes/index.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(routes);

export default app;
