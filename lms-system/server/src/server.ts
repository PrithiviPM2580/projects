import app from "./app.js";
import connectToDatabase from "./config/db.config.js";
import { env } from "./config/env.config.js";

const PORT = env.port;

async function startServer() {
  await connectToDatabase();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
