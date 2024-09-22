import { asyncHandler, ApiError, ApiResponse, logger } from "../utils/index.js";
import User from "../models/user.model.js";
import getRoadMap from "../services/getRoadmap.js";

const cookieOptions = {
  httpOnly: true,
  secure: true,
};

const generateAccessAndRefreshTokens = async (userID) => {
  try {
    const user = await User.findById(userID);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh tokens"
    );
  }
};

const getRoadMapHere = asyncHandler(async (req, res) => {
  const { topic } = req.body;
  const roadmap = await getRoadMap(topic);
  res.status(200).json(new ApiResponse(200, roadmap, "Roadmap generated"));
});

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  // validation if fields are empty
  if (!fullName || !email || !password) {
    logger("All fields are required");
    throw new ApiError(400, "All fields are required");
  }

  // check if user already exists
  const user = await User.findOne({ email });
  if (user) {
    logger("User already exists, can't register");
    throw new ApiError(409, "User already exists, can't register");
  }

  // create new user
  const newUser = await User.create({
    fullName,
    email,
    password,
  });

  // error
  if (!newUser) {
    logger("User registration failed");
    throw new ApiError(500, "User registration failed");
  }

  // response
  logger("User registered successfully with the email address: " + email);
  res.status(201).json(
    new ApiResponse(
      201,
      {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      },
      "User registered successfully"
    )
  );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // validation if fields are empty
  if (!email || !password) {
    logger("All fields are required");
    throw new ApiError(400, "All fields are required");
  }

  // check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    logger("User doesn't exist, can't login");
    throw new ApiError(404, "User doesn't exist, can't login");
  }

  // check if password is correct
  const isPasswordValid = await user.isPasswordValid(password);
  if (!isPasswordValid) {
    logger("Password is incorrect, can't login");
    throw new ApiError(401, "Password is incorrect, can't login");
  }

  // access and refresh token
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  // send cookie
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: parseInt(process.env.ACCESS_TOKEN_EXPIRY) * 1000 * 60 * 60 * 24,
    })
    .cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: parseInt(process.env.REFRESH_TOKEN_EXPIRY) * 1000 * 60 * 60 * 24,
    })
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  const response = await User.findOneAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );
  res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, null, "User logged out successfully"));
});

const getUser = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
});

export { registerUser, loginUser, logoutUser, getUser, getRoadMapHere };
