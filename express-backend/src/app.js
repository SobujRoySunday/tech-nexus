import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { DATA_LIMIT } from "./constants.js";
import { userRoutes } from "./routes/index.js";

const app = express();
const corsOptions = {
  origin: process.env.CORS_ORIGIN_URL,
  credentials: true,
};
const jsonOptions = {
  limit: DATA_LIMIT,
};
const urlencodedOptions = {
  limit: DATA_LIMIT,
  extended: true,
};

app.use(cors(corsOptions));
app.use(express.json(jsonOptions));
app.use(express.urlencoded(urlencodedOptions));
app.use(express.static("public"));
app.use(cookieParser());

// routers
app.use("/api/v1/user", userRoutes);

export default app;
