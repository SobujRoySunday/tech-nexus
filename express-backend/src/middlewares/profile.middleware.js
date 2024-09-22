import { asyncHandler, ApiError, logger } from "../utils/index.js";
import Profile from "../models/profile.model.js";

export const provideProfile = asyncHandler(async (req, _, next) => {
  // get profile and populate it with user
  const profile = await Profile.findOne({ user: req.user._id }).populate(
    "user"
  );
  if (!profile) {
    logger("Profile not found");
    throw new ApiError(404, "Profile not found");
  }

  req.profile = profile;
  next();
});
