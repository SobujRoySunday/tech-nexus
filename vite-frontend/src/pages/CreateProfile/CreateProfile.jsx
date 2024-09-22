import React, { useEffect, useState } from "react";
import Container from "../../layouts/Container";
import StudentImage from "../../assets/student.png";
import { useSelector } from "react-redux";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const CreateProfile = () => {
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state) => state.userData);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    place: "",
    objective: "",
    expectations: "",
    role: "",
    skills: [],
    education: [],
    workExperience: [],
    trainingCourses: [],
    projects: [],
    socialMediaLinks: {
      github: "",
      portfolio: "",
      linkedin: "",
    },
  });
  const [skillField, setSkillField] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    authService
      .createProfile(formData)
      .then((res) => {
        if (res === 201) {
          console.log("Profile created successfully");
          navigate("/");
        } else if (res === 500) {
          console.log("Server error");
        } else if (res === 400) {
          console.log("Bad request");
        } else {
          console.log("Unknown error");
        }
      })
      .finally(() => setLoading(false));
  };

  const addEducation = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        {
          educationType: "10th",
          institutionName: "",
          startYear: 2024,
          endYear: 2024,
          score: 0,
          scoreType: "CGPA",
        },
      ],
    });
  };

  const addWorkExperience = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      workExperience: [
        ...formData.workExperience,
        {
          designation: "",
          organization: "",
          startDate: "",
          endDate: "",
          currentlyWorking: true,
          location: "",
          description: "",
        },
      ],
    });
  };

  const addTrainingCourses = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      trainingCourses: [
        ...formData.trainingCourses,
        {
          trainingProgram: "",
          organization: "",
          startDate: "",
          endDate: "",
          location: "",
          description: "",
        },
      ],
    });
  };

  const addProjects = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        {
          title: "",
          startDate: "",
          endDate: "",
          description: "",
          projectLink: "",
        },
      ],
    });
  };

  useEffect(() => {
    if (skillField && skillField.charAt(skillField.length - 1) === ",") {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillField.slice(0, -1)],
      });

      setSkillField("");
    }
  }, [skillField]);

  return (
    <Container>
      {loading && <Loader />}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          {/* Account details */}
          <div className="flex flex-row items-center justify-center p-10">
            <div className="w-1/3 flex justify-center items-center">
              <img
                src={StudentImage}
                alt="student"
                className="rounded-full border-2 border-blue-500 w-[70%]"
              />
            </div>
            <div className="w-2/3 flex flex-col gap-2">
              <h2 className="text-6xl">{userData.fullName}</h2>
              <a
                href={`mailto:${userData.email}`}
                className="underline text-gray-500"
              >
                {userData.email}
              </a>
            </div>
          </div>

          {/* Personal details */}
          <div className="flex flex-col p-10 gap-2">
            <h3 className="text-3xl">Personal Details</h3>
            <div>
              <label className="text-sm text-gray-500" htmlFor="phoneNumber">
                <span className="text-red-500">*</span> Phone Number:
              </label>
              <input
                className="border-2 border-black py-2 px-3 w-full"
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                pattern="[0-9]{10}"
                maxLength="10"
                minLength="10"
                value={formData.phoneNumber}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    phoneNumber: e.target.value,
                  });
                }}
                required
              />
            </div>
            <div>
              <label className="text-sm text-gray-500" htmlFor="place">
                <span className="text-red-500">*</span> Address:
              </label>
              <input
                className="border-2 border-black py-2 px-3 w-full"
                type="text"
                id="place"
                name="place"
                value={formData.place}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    place: e.target.value,
                  });
                }}
                required
              />
            </div>
            <div>
              <label className="text-sm text-gray-500" htmlFor="objective">
                Career Objective:
              </label>
              <input
                className="border-2 border-black py-2 px-3 w-full"
                type="text"
                id="objective"
                name="objective"
                value={formData.objective}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    objective: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <label className="text-sm text-gray-500" htmlFor="expectations">
                Expectations:
              </label>
              <input
                className="border-2 border-black py-2 px-3 w-full"
                type="text"
                id="expectations"
                name="expectations"
                value={formData.expectations}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    expectations: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <label className="text-sm text-gray-500" htmlFor="role">
                Job role which you are looking for:
              </label>
              <input
                className="border-2 border-black py-2 px-3 w-full"
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    role: e.target.value,
                  });
                }}
              />
            </div>
          </div>

          {/* Skills */}
          {/* <div className="flex flex-col p-10 gap-2">
            <h3 className="text-3xl">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <p
                  key={index}
                  className="bg-blue-500 text-white text-xs py-2 px-3 rounded-md w-fit"
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      let oldSkills = formData.skills;
                      oldSkills.splice(index, 1);
                      setFormData({ ...formData, skills: oldSkills });
                    }}
                    className="mr-2 font-bold"
                  >
                    x
                  </button>
                  {skill}
                </p>
              ))}
            </div> */}
          {/* <div>
              <label className="text-sm text-gray-500" htmlFor="skills">
                Skills(comma separated):
              </label>
              <input
                className="border-2 border-black py-2 px-3 w-full"
                type="text"
                id="skills"
                name="skills"
                value={skillField}
                onChange={(e) => {
                  setSkillField(e.target.value);
                }}
              />
            </div>
          </div> */}

          {/* Education */}
          <div className="flex flex-col p-10 gap-4">
            <h3 className="text-3xl">Education</h3>
            <div className="flex flex-col gap-4">
              {formData.education.map((edu, index) => (
                <div key={index} className="flex flex-row gap-4">
                  {/* Education Type */}
                  <div className="flex flex-row gap-2 items-center">
                    <label
                      className="text-sm text-gray-500 flex flex-row gap-1 items-center"
                      htmlFor="educationType"
                    >
                      <span className="text-red-500">*</span> Type:
                    </label>
                    <select
                      className="border-2 border-black py-2 px-3 w-full"
                      id="educationType"
                      name="educationType"
                      value={edu.educationType}
                      onChange={(e) => {
                        let oldEducation = formData.education;
                        oldEducation[index].educationType = e.target.value;
                        setFormData({ ...formData, education: oldEducation });
                      }}
                      required
                    >
                      <option value="10th">10th</option>
                      <option value="12th">12th</option>
                      <option value="UG">UG</option>
                      <option value="PG">PG</option>
                    </select>
                  </div>

                  {/* Institution Name */}
                  <div className="flex flex-row gap-2 items-center">
                    <label
                      className="text-sm text-gray-500 flex flex-row items-center gap-1"
                      htmlFor="institutionName"
                    >
                      <span className="text-red-500">*</span> Institution Name:
                    </label>
                    <input
                      className="border-2 border-black py-2 px-3 w-full"
                      type="text"
                      id="institutionName"
                      name="institutionName"
                      value={edu.institutionName}
                      onChange={(e) => {
                        let oldEducation = formData.education;
                        oldEducation[index].institutionName = e.target.value;
                        setFormData({ ...formData, education: oldEducation });
                      }}
                      required
                    />
                  </div>

                  {/* Start Year */}
                  <div className="flex flex-row gap-2 items-center w-32">
                    <label
                      className="text-sm text-gray-500 flex flex-row items-center gap-1"
                      htmlFor="startYear"
                    >
                      <span className="text-red-500">*</span> Start Year:
                    </label>
                    <input
                      className="border-2 border-black py-2 px-3 w-full"
                      type="number"
                      id="startYear"
                      name="startYear"
                      value={edu.startYear}
                      onChange={(e) => {
                        let oldEducation = formData.education;
                        oldEducation[index].startYear = parseInt(
                          e.target.value
                        );
                        setFormData({ ...formData, education: oldEducation });
                      }}
                      required
                    />
                  </div>

                  {/* End Year */}
                  <div className="flex flex-row gap-2 items-center w-32">
                    <label
                      className="text-sm text-gray-500 flex flex-row items-center gap-1"
                      htmlFor="endYear"
                    >
                      <span className="text-red-500">*</span> End Year:
                    </label>
                    <input
                      className="border-2 border-black py-2 px-3 w-full"
                      type="number"
                      id="endYear"
                      name="endYear"
                      value={edu.endYear}
                      onChange={(e) => {
                        let oldEducation = formData.education;
                        oldEducation[index].endYear = parseInt(e.target.value);
                        setFormData({ ...formData, education: oldEducation });
                      }}
                      required
                    />
                  </div>

                  {/* Score */}
                  <div className="flex flex-row gap-2 items-center w-32">
                    <label
                      className="text-sm text-gray-500 flex flex-row items-center gap-1"
                      htmlFor="score"
                    >
                      <span className="text-red-500">*</span> Score:
                    </label>
                    <input
                      className="border-2 border-black py-2 px-3 w-full"
                      type="number"
                      id="score"
                      name="score"
                      value={edu.score}
                      onChange={(e) => {
                        let oldEducation = formData.education;
                        oldEducation[index].score = parseInt(e.target.value);
                        setFormData({ ...formData, education: oldEducation });
                      }}
                      required
                    />
                  </div>

                  {/* Score Type */}
                  <div className="flex flex-row gap-2 items-center w-36">
                    <label
                      className="text-sm text-gray-500 flex flex-row items-center gap-1"
                      htmlFor="scoreType"
                    >
                      <span className="text-red-500">*</span> Score Type:
                    </label>
                    <select
                      className="border-2 border-black py-2 px-3 w-full"
                      id="scoreType"
                      name="scoreType"
                      value={edu.scoreType}
                      onChange={(e) => {
                        let oldEducation = formData.education;
                        oldEducation[index].scoreType = e.target.value;
                        setFormData({ ...formData, education: oldEducation });
                      }}
                      required
                    >
                      <option value="CGPA">CGPA</option>
                      <option value="Percentage">Percentage</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={addEducation}
              disabled={formData.education.length == 4}
              className="border-[1px] border-gray-400 w-fit text-gray-400 py-2 px-4 hover:text-gray-600 transition disabled:border-gray-200 disabled:text-gray-200 disabled:cursor-not-allowed"
            >
              Add education
            </button>
          </div>

          {/* Work Experiences */}
          <div className="flex flex-col p-10 gap-8">
            <h3 className="text-3xl">Work Experiences</h3>
            <div className="flex flex-col gap-8">
              {formData.workExperience.map((exp, index) => (
                <div key={index}>
                  <div
                    key={index}
                    className="flex flex-wrap items-center gap-4"
                  >
                    {/* Designation */}
                    <div className="flex flex-row gap-2 items-center w-96">
                      <label
                        className="text-sm text-gray-500 flex flex-row items-center gap-1"
                        htmlFor="designation"
                      >
                        <span className="text-red-500">*</span> Designation:
                      </label>
                      <input
                        className="border-2 border-black py-2 px-3 w-full"
                        type="text"
                        id="designation"
                        name="designation"
                        value={exp.designation}
                        onChange={(e) => {
                          let oldworkExperience = formData.workExperience;
                          oldworkExperience[index].designation = e.target.value;
                          setFormData({
                            ...formData,
                            workExperience: oldworkExperience,
                          });
                        }}
                        required
                      />
                    </div>

                    {/* Organization */}
                    <div className="flex flex-row gap-2 items-center w-96">
                      <label
                        className="text-sm text-gray-500 flex flex-row items-center gap-1"
                        htmlFor="organization"
                      >
                        <span className="text-red-500">*</span> Organization:
                      </label>
                      <input
                        className="border-2 border-black py-2 px-3 w-full"
                        type="text"
                        id="organization"
                        name="organization"
                        value={exp.organization}
                        onChange={(e) => {
                          let oldworkExperience = formData.workExperience;
                          oldworkExperience[index].organization =
                            e.target.value;
                          setFormData({
                            ...formData,
                            workExperience: oldworkExperience,
                          });
                        }}
                        required
                      />
                    </div>

                    {/* Location */}
                    <div className="flex flex-row gap-2 items-center w-64">
                      <label
                        className="text-sm text-gray-500 flex flex-row items-center gap-1"
                        htmlFor="location"
                      >
                        <span className="text-red-500">*</span> Location:
                      </label>
                      <input
                        className="border-2 border-black py-2 px-3 w-full"
                        type="text"
                        id="location"
                        name="location"
                        value={exp.location}
                        onChange={(e) => {
                          let oldworkExperience = formData.workExperience;
                          oldworkExperience[index].location = e.target.value;
                          setFormData({
                            ...formData,
                            workExperience: oldworkExperience,
                          });
                        }}
                        required
                      />
                    </div>

                    {/* Start Date */}
                    <div className="flex flex-row gap-2 items-center w-64">
                      <label
                        className="text-sm text-gray-500 flex flex-row items-center gap-1"
                        htmlFor="startDate"
                      >
                        <span className="text-red-500">*</span> Start Date:
                      </label>
                      <input
                        className="border-2 border-black py-2 px-3 w-full"
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={exp.startDate}
                        onChange={(e) => {
                          let oldworkExperience = formData.workExperience;
                          oldworkExperience[index].startDate = e.target.value;
                          setFormData({
                            ...formData,
                            workExperience: oldworkExperience,
                          });
                        }}
                        required
                      />
                    </div>

                    {/* End Date */}
                    <div className="flex flex-row gap-2 items-center w-64">
                      <label
                        className="text-sm text-gray-500 flex flex-row items-center gap-1"
                        htmlFor="endDate"
                      >
                        End Date:
                      </label>
                      <input
                        className="border-2 border-black py-2 px-3 w-full disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                        type="date"
                        id="endDate"
                        name="endDate"
                        disabled={exp.isCurrentlyWorking}
                        value={exp.endDate}
                        onChange={(e) => {
                          let oldworkExperience = formData.workExperience;
                          oldworkExperience[index].endDate = e.target.value;
                          setFormData({
                            ...formData,
                            workExperience: oldworkExperience,
                          });
                        }}
                      />
                    </div>

                    {/* is currently working */}
                    <div className="flex flex-row items-center w-20">
                      <label
                        className="text-sm text-gray-500 flex flex-row items-center gap-1"
                        htmlFor="isCurrentlyWorking"
                      >
                        Working?
                      </label>
                      <input
                        className="border-2 border-black py-2 px-3 w-full"
                        type="checkbox"
                        id="isCurrentlyWorking"
                        name="isCurrentlyWorking"
                        checked={exp.isCurrentlyWorking}
                        onChange={(e) => {
                          let oldworkExperience = formData.workExperience;
                          oldworkExperience[index].isCurrentlyWorking =
                            e.target.checked;
                          if (e.target.checked) {
                            oldworkExperience[index].endDate = "";
                          }
                          setFormData({
                            ...formData,
                            workExperience: oldworkExperience,
                          });
                        }}
                      />
                    </div>

                    {/* Description */}
                    <div className="flex flex-row gap-2 items-center w-96">
                      <label
                        className="text-sm text-gray-500 flex flex-row items-center gap-1"
                        htmlFor="description"
                      >
                        Description:
                      </label>
                      <input
                        className="border-2 border-black py-2 px-3 w-full"
                        type="text"
                        id="description"
                        name="description"
                        value={exp.description}
                        onChange={(e) => {
                          let oldworkExperience = formData.workExperience;
                          oldworkExperience[index].description = e.target.value;
                          setFormData({
                            ...formData,
                            workExperience: oldworkExperience,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <hr className="my-4" />
                </div>
              ))}
            </div>
            <button
              onClick={addWorkExperience}
              className="border-[1px] border-gray-400 w-fit text-gray-400 py-2 px-4 hover:text-gray-600 transition disabled:border-gray-200 disabled:text-gray-200 disabled:cursor-not-allowed"
            >
              Add Work Experience
            </button>
          </div>

          {/* Training courses */}
          <div className="flex flex-col gap-4 p-10">
            <h3 className="text-3xl">Training Courses</h3>
            <div className="flex flex-col gap-4">
              {formData.trainingCourses.map((course, index) => (
                <div key={index}>
                  <div className="flex flex-wrap gap-4">
                    {/* Training Program */}
                    <div className="flex flex-row gap-2 items-center w-96">
                      <label
                        className="text-sm text-gray-500 flex flex-row items-center gap-1"
                        htmlFor="trainingProgram"
                      >
                        <span className="text-red-500">*</span> Training
                        Program:
                      </label>
                      <input
                        className="border-2 border-black py-2 px-3 w-full"
                        type="text"
                        id="trainingProgram"
                        name="trainingProgram"
                        value={course.trainingProgram}
                        onChange={(e) => {
                          let oldtrainingCourses = formData.trainingCourses;
                          oldtrainingCourses[index].trainingProgram =
                            e.target.value;
                          setFormData({
                            ...formData,
                            trainingCourses: oldtrainingCourses,
                          });
                        }}
                        required
                      />
                    </div>

                    {/* Organization */}
                    <div className="flex flex-row gap-2 items-center w-64">
                      <label
                        className="text-sm text-gray-500 flex flex-row items-center gap-1"
                        htmlFor="organization"
                      >
                        <span className="text-red-500">*</span> Organization:
                      </label>
                      <input
                        className="border-2 border-black py-2 px-3 w-full"
                        type="text"
                        id="organization"
                        name="organization"
                        value={course.organization}
                        onChange={(e) => {
                          let oldtrainingCourses = formData.trainingCourses;
                          oldtrainingCourses[index].organization =
                            e.target.value;
                          setFormData({
                            ...formData,
                            trainingCourses: oldtrainingCourses,
                          });
                        }}
                        required
                      />
                    </div>

                    {/* Location */}
                    <div className="flex flex-row gap-2 items-center w-64">
                      <label
                        className="text-sm text-gray-500 flex flex-row items-center gap-1"
                        htmlFor="location"
                      >
                        Location:
                      </label>
                      <input
                        className="border-2 border-black py-2 px-3 w-full"
                        type="text"
                        id="location"
                        name="location"
                        value={course.location}
                        onChange={(e) => {
                          let oldtrainingCourses = formData.trainingCourses;
                          oldtrainingCourses[index].location = e.target.value;
                          setFormData({
                            ...formData,
                            trainingCourses: oldtrainingCourses,
                          });
                        }}
                      />
                    </div>

                    {/* Start Date */}
                    <div className="flex flex-row gap-2 items-center w-64">
                      <label
                        className="text-sm text-gray-500 flex flex-row items-center gap-1"
                        htmlFor="startDate"
                      >
                        <span className="text-red-500">*</span> Start Date:
                      </label>
                      <input
                        className="border-2 border-black py-2 px-3 w-full"
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={course.startDate}
                        onChange={(e) => {
                          let oldtrainingCourses = formData.trainingCourses;
                          oldtrainingCourses[index].startDate = e.target.value;
                          setFormData({
                            ...formData,
                            trainingCourses: oldtrainingCourses,
                          });
                        }}
                        required
                      />
                    </div>

                    {/* End Date */}
                    <div className="flex flex-row gap-2 items-center w-64">
                      <label
                        className="text-sm text-gray-500 flex flex-row items-center gap-1"
                        htmlFor="endDate"
                      >
                        End Date:
                      </label>
                      <input
                        className="border-2 border-black py-2 px-3 w-full"
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={course.endDate}
                        onChange={(e) => {
                          let oldtrainingCourses = formData.trainingCourses;
                          oldtrainingCourses[index].endDate = e.target.value;
                          setFormData({
                            ...formData,
                            trainingCourses: oldtrainingCourses,
                          });
                        }}
                      />
                    </div>

                    {/* Description */}
                    <div className="flex flex-row gap-2 items-center w-64">
                      <label
                        className="text-sm text-gray-500 flex flex-row items-center gap-1"
                        htmlFor="description"
                      >
                        Description:
                      </label>
                      <input
                        className="border-2 border-black py-2 px-3 w-full"
                        type="text"
                        id="description"
                        name="description"
                        value={course.description}
                        onChange={(e) => {
                          let oldtrainingCourses = formData.trainingCourses;
                          oldtrainingCourses[index].description =
                            e.target.value;
                          setFormData({
                            ...formData,
                            trainingCourses: oldtrainingCourses,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <hr className="my-4" />
                </div>
              ))}
            </div>
            <button
              onClick={addTrainingCourses}
              className="border-[1px] border-gray-400 w-fit text-gray-400 py-2 px-4 hover:text-gray-600 transition disabled:border-gray-200 disabled:text-gray-200 disabled:cursor-not-allowed"
            >
              Add Course
            </button>
          </div>

          {/* Projects */}
          <div className="flex flex-col gap-4 p-10">
            <h3 className="text-3xl">Projects</h3>

            <div className="flex flex-col gap-4">
              {formData.projects.map((project, index) => (
                <div key={index}>
                  <div className="flex flex-wrap gap-2 items-center">
                    {/* Title */}
                    <div className="flex flex-row gap-2 items-center w-96">
                      <label
                        className="text-sm text-gray-500 flex flex-row items-center gap-1"
                        htmlFor="title"
                      >
                        <span className="text-red-500">*</span> Title:
                      </label>
                      <input
                        className="border-2 border-black py-2 px-3 w-full"
                        type="text"
                        id="title"
                        name="title"
                        value={project.title}
                        onChange={(e) => {
                          let oldprojects = formData.projects;
                          oldprojects[index].title = e.target.value;
                          setFormData({
                            ...formData,
                            projects: oldprojects,
                          });
                        }}
                        required
                      />
                    </div>

                    {/* Start Date */}
                    <div className="flex flex-row gap-2 items-center w-64">
                      <label
                        className="text-sm text-gray-500 flex flex-row items-center gap-1"
                        htmlFor="startDate"
                      >
                        <span className="text-red-500">*</span> Start Date:
                      </label>
                      <input
                        className="border-2 border-black py-2 px-3 w-full"
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={project.startDate}
                        onChange={(e) => {
                          let oldprojects = formData.projects;
                          oldprojects[index].startDate = e.target.value;
                          setFormData({
                            ...formData,
                            projects: oldprojects,
                          });
                        }}
                        required
                      />
                    </div>

                    {/* End Date */}
                    <div className="flex flex-row gap-2 items-center w-64">
                      <label
                        className="text-sm text-gray-500 flex flex-row items-center gap-1"
                        htmlFor="endDate"
                      >
                        <span className="text-red-500">*</span> End Date:
                      </label>
                      <input
                        className="border-2 border-black py-2 px-3 w-full"
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={project.endDate}
                        onChange={(e) => {
                          let oldprojects = formData.projects;
                          oldprojects[index].endDate = e.target.value;
                          setFormData({
                            ...formData,
                            projects: oldprojects,
                          });
                        }}
                        required
                      />
                    </div>

                    {/* Description */}
                    <div className="flex flex-row gap-2 items-center w-96">
                      <label
                        className="text-sm text-gray-500 flex flex-row items-center gap-1"
                        htmlFor="description"
                      >
                        Description:
                      </label>
                      <input
                        className="border-2 border-black py-2 px-3 w-full"
                        type="text"
                        id="description"
                        name="description"
                        value={project.description}
                        onChange={(e) => {
                          let oldprojects = formData.projects;
                          oldprojects[index].description = e.target.value;
                          setFormData({
                            ...formData,
                            projects: oldprojects,
                          });
                        }}
                      />
                    </div>

                    {/* Project Link */}
                    <div className="flex flex-row gap-2 items-center w-96">
                      <label
                        className="text-sm text-gray-500 flex flex-row items-center gap-1"
                        htmlFor="projectLink"
                      >
                        Project Link:
                      </label>
                      <input
                        className="border-2 border-black py-2 px-3 w-full"
                        type="text"
                        id="projectLink"
                        name="projectLink"
                        value={project.projectLink}
                        onChange={(e) => {
                          let oldprojects = formData.projects;
                          oldprojects[index].projectLink = e.target.value;
                          setFormData({
                            ...formData,
                            projects: oldprojects,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <hr className="my-4" />
                </div>
              ))}
            </div>

            <button
              onClick={addProjects}
              className="border-[1px] border-gray-400 w-fit text-gray-400 py-2 px-4 hover:text-gray-600 transition disabled:border-gray-200 disabled:text-gray-200 disabled:cursor-not-allowed"
            >
              Add Project
            </button>
          </div>

          {/* Social Media */}
          <div className="flex flex-col gap-4 p-10">
            <h3 className="text-3xl">Social Media Links</h3>
            {/* Github */}
            <div>
              <label
                className="text-sm text-gray-500 flex flex-row items-center gap-1"
                htmlFor="github"
              >
                Github:
              </label>
              <input
                className="border-2 border-black py-2 px-3 w-full"
                type="text"
                id="github"
                name="github"
                value={formData.socialMediaLinks.github}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    socialMediaLinks: {
                      ...formData.socialMediaLinks,
                      github: e.target.value,
                    },
                  });
                }}
              />
            </div>

            {/* Portfolio */}
            <div>
              <label
                className="text-sm text-gray-500 flex flex-row items-center gap-1"
                htmlFor="portfolio"
              >
                Portfolio:
              </label>
              <input
                className="border-2 border-black py-2 px-3 w-full"
                type="text"
                id="portfolio"
                name="portfolio"
                value={formData.socialMediaLinks.portfolio}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    socialMediaLinks: {
                      ...formData.socialMediaLinks,
                      portfolio: e.target.value,
                    },
                  });
                }}
              />
            </div>

            {/* LinkedIn */}
            <div>
              <label
                className="text-sm text-gray-500 flex flex-row items-center gap-1"
                htmlFor="linkedin"
              >
                LinkedIn:
              </label>
              <input
                className="border-2 border-black py-2 px-3 w-full"
                type="text"
                id="linkedin"
                name="linkedin"
                value={formData.socialMediaLinks.linkedin}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    socialMediaLinks: {
                      ...formData.socialMediaLinks,
                      linkedin: e.target.value,
                    },
                  });
                }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center p-10">
            <button
              type="submit"
              className="bg-blue-500 w-fit text-white py-2 px-4 hover:bg-blue-600 transition"
            >
              Create Profile
            </button>
          </div>
        </div>
      </form>
    </Container>
  );
};

export default CreateProfile;
