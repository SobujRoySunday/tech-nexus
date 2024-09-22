import { logger, ApiError, asyncHandler, ApiResponse } from "../utils/index.js";
import Profile from "../models/profile.model.js";
import { SCORES } from "../constants.js";
import getProfileScore from "../services/getProfileScore.js";
import getSuggestions from "../services/getProfileSuggestion.js";
import aiTest from "../services/getTest.js";

const getTest = async (req, res) => {
  let response;
  let trys = 10;

  while (!response && trys--) {
    try {
      const skill = req.query.skill;
      console.log("Skill:", skill);

      response = await aiTest(skill);
      res
        .status(200)
        .json(new ApiResponse(200, response, "Profile fetched successfully"));
    } catch (err) {
      logger(err);
      // throw new ApiError(500, "Internal server error");
    }
  }
};

const evaluateProfileScore = async (profile) => {
  let totalScore = 0;

  if (profile.objective) {
    totalScore += 1;
  }

  if (profile.expectations) {
    totalScore += 1;
  }

  if (profile.role) {
    totalScore += 2;
  }

  if (profile.place) {
    totalScore += 2;
  }

  if (profile.phoneNumber) {
    totalScore += 2;
  }

  if (profile.education) {
    profile.education.forEach(() => {
      totalScore += SCORES.education;
    });
  }

  if (profile.workExperience) {
    profile.workExperience.forEach(() => {
      totalScore += SCORES.workExperience;
    });
  }

  if (profile.socialMediaLinks.github) {
    totalScore += SCORES.socials;
  }
  if (profile.socialMediaLinks.portfolio) {
    totalScore += SCORES.socials;
  }
  if (profile.socialMediaLinks.linkedin) {
    totalScore += SCORES.socials;
  }

  let LLMScore = 0;
  LLMScore += await getProfileScore(JSON.stringify(profile));
  LLMScore += await getProfileScore(JSON.stringify(profile));
  LLMScore += await getProfileScore(JSON.stringify(profile));
  LLMScore = Math.floor(LLMScore / 3);

  totalScore += LLMScore;

  return totalScore;
};

const getProfileSuggestions = asyncHandler(async (req, res) => {
  const profile = req.profile;
  const suggestions = await getSuggestions(JSON.stringify(profile));
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { suggestions: suggestions.slice(0, 5) },
        "Profile suggestions fetched"
      )
    );
});

const getProfileRank = asyncHandler(async (req, res) => {
  // get rank of the profile based on profile score
  const profile = req.profile;
  const profileScore = profile.profileScore;

  const rank =
    (await Profile.find({ profileScore: { $gt: profileScore } })).length + 1;

  res
    .status(200)
    .json(new ApiResponse(200, { rank }, "Profile rank fetched successfully"));
});

const createProfile = asyncHandler(async (req, res) => {
  const {
    phoneNumber,
    place,
    objective,
    expectations,
    skills,
    role,
    education,
    workExperience,
    trainingCourses,
    projects,
    socialMediaLinks,
  } = req.body;

  // check if profile already exists with this user
  const profile = await Profile.findOne({ user: req.user._id });
  if (profile) {
    logger("Profile already exists, can't create");
    throw new ApiError(409, "Profile already exists, can't create");
  }

  // check if required fields are not empty
  if (!phoneNumber || !place) {
    logger("All fields are required");
    throw new ApiError(400, "All fields are required");
  }

  const newProfile = await Profile.create({
    user: req.user._id,
    phoneNumber,
    place,
    objective,
    expectations,
    skills,
    role,
    education,
    workExperience,
    trainingCourses,
    projects,
    socialMediaLinks,
  });

  if (!newProfile) {
    logger("Profile creation failed");
    throw new ApiError(500, "Profile creation failed");
  }

  newProfile.profileScore = await evaluateProfileScore(newProfile);
  await newProfile.save();

  logger("Profile created successfully");
  res
    .status(201)
    .json(new ApiResponse(201, profile, "Profile created successfully"));
});

const getProfile = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, req.profile, "Profile found"));
});

const addSkillToProfile = asyncHandler(async (req, res) => {
  const { skill } = req.body;
  const profile = req.profile;

  profile.skills.push(skill);
  profile.profileScore = (await evaluateProfileScore(profile)) + SCORES.skill;
  await profile.save();
  res
    .status(200)
    .json(new ApiResponse(200, profile, "Skill added to profile successfully"));
});

const updateProfile = asyncHandler(async (req, res) => {
  const {
    phoneNumber,
    place,
    objective,
    expectations,
    skills,
    role,
    education,
    workExperience,
    trainingCourses,
    projects,
    socialMediaLinks,
  } = req.body;

  // get the current profile details and fill in details which are not provided in the request
  const profile = await Profile.findOne({ user: req.user._id });
  if (!profile) {
    logger("Profile not found");
    throw new ApiError(404, "Profile not found");
  }

  profile.phoneNumber = phoneNumber || profile.phoneNumber;
  profile.place = place || profile.place;
  profile.objective = objective || profile.objective;
  profile.expectations = expectations || profile.expectations;
  profile.skills = skills || profile.skills;
  profile.role = role || profile.role;
  profile.education = education || profile.education;
  profile.workExperience = workExperience || profile.workExperience;
  profile.trainingCourses = trainingCourses || profile.trainingCourses;
  profile.projects = projects || profile.projects;
  profile.socialMediaLinks = socialMediaLinks || profile.socialMediaLinks;
  profile.profileScore = await evaluateProfileScore(profile);

  const updatedProfile = await profile.save();
  if (!updatedProfile) {
    logger("Profile update failed");
    throw new ApiError(500, "Profile update failed");
  }

  logger("Profile updated successfully");
  res
    .status(200)
    .json(new ApiResponse(200, updatedProfile, "Profile updated successfully"));
});

export {
  createProfile,
  getProfile,
  updateProfile,
  getProfileRank,
  getProfileSuggestions,
  getTest,
  addSkillToProfile,
};
