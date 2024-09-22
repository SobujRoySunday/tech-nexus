import jwt from "jsonwebtoken";
import { asyncHandler, ApiError, logger } from "../utils/index.js";
import User from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    logger("Unauthorized request");
    throw new ApiError(401, "Unauthorized request");
  }

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  const user = await User.findById(decodedToken?._id).select(
    "-password -refreshToken"
  );
  if (!user) {
    logger("Invalid access token");
    throw new ApiError(401, "Invalid access token");
  }

  req.user = user;
  next();
});
