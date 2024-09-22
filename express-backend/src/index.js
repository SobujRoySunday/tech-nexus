import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";
import logger from "./utils/logger.js";

dotenv.config();

connectDB()
  .then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      logger(`Server running on port ${port}`);
    });
  })
  .catch((err) => logger(err));
