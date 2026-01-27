import express, { type Express } from "express";
import routes from "./routes/index.route.js";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

export default app;
