import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  getRoadMapHere,
} from "../controllers/user.controller.js";
import {
  createProfile,
  getProfile,
  updateProfile,
  getProfileRank,
  getProfileSuggestions,
  getTest,
  addSkillToProfile,
} from "../controllers/profile.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { provideProfile } from "../middlewares/profile.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/roadmap", getRoadMapHere);

// secured routes
router.post("/logout", verifyJWT, logoutUser);
router.post("/newProfile", verifyJWT, createProfile);
router.get("/getThisUser", verifyJWT, getUser);

// secured routes with profile
router.get("/profile", verifyJWT, provideProfile, getProfile);
router.put("/updateProfile", verifyJWT, provideProfile, updateProfile);
router.get("/getProfileRank", verifyJWT, provideProfile, getProfileRank);
router.get(
  "/getProfileSuggestion",
  verifyJWT,
  provideProfile,
  getProfileSuggestions
);
router.get("/getTest", verifyJWT, provideProfile, getTest);
router.post("/addSkillToProfile", verifyJWT, provideProfile, addSkillToProfile);

export default router;
