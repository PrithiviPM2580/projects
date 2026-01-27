import { Router } from "express";
import userRoute from "./user.route.js";

const router: Router = Router();

router.route("/").get((_req, res) => {
  res.send("Welcome to the LMS System API");
});

router.route("/health").get((_req, res) => {
  res.status(200).send("OK");
});

router.use("/api/v1/auth", userRoute);

router.use((_req, res) => {
  res.status(404).send("Route not found");
});

export default router;
