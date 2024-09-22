import mongoose from "mongoose";
import Badge from "./badgeModel.js";

const educationSchema = new mongoose.Schema({
  educationType: {
    type: String,
    enum: ["10th", "12th", "UG", "PG"],
    required: true,
  },
  institutionName: {
    type: String,
    required: true,
  },
  startYear: {
    type: Number,
    required: true,
  },
  endYear: {
    type: Number,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  scoreType: {
    type: String,
    enum: ["CGPA", "Percentage"],
    required: true,
  },
});

const workExperienceSchema = new mongoose.Schema({
  designation: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    // it is an optional field, as not giving any endDate means currently working
  },
  currentlyWorking: {
    type: Boolean,
    default: false,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const trainingCourseSchema = new mongoose.Schema({
  trainingProgram: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    // it is an optional field, as not giving any endDate means currently working
  },
  description: {
    type: String,
  },
});

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
  },
  projectLink: {
    type: String,
  },
});

const socialMediaSchema = new mongoose.Schema({
  github: {
    type: String,
    validate: (value) => {
      return value.startsWith("https://github.com/") || value === "";
    },
  },
  portfolio: {
    type: String,
    validate: (value) => {
      return value.startsWith("https://") || value === "";
    },
  },
  linkedin: {
    type: String,
    validate: (value) => {
      return value.startsWith("https://www.linkedin.com/in/") || value === "";
    },
  },
});

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    objective: {
      type: String,
    },
    expectations: {
      type: String,
    },
    skills: [
      {
        type: String,
      },
    ],
    role: {
      type: String,
    },
    education: [educationSchema],
    workExperience: [workExperienceSchema],
    trainingCourses: [trainingCourseSchema],
    projects: [projectSchema],
    socialMediaLinks: socialMediaSchema,
    profileScore: {
      type: Number,
      default: 0,
    },
    earnedBadges: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
