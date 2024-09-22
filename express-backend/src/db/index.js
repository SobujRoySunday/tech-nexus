import mongoose from "mongoose";
import logger from "../utils/logger.js";

const connectDB = async () => {
  try {
    logger("Connecting to MongoDB...");
    const conn = await mongoose.connect(`${process.env.MONGODB_URI}`);
    logger(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
