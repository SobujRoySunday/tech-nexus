import Container from "../../layouts/Container";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import StudentImage from "../../assets/student.png";
import BookImage from "../../assets/books.png";
import { useEffect, useState } from "react";
import authService from "../../services/auth.service";
import Loader from "../../components/Loader/Loader";

const Dashboard = () => {
  const profileData = useSelector((state) => state.profileData);
  const [profileRank, setProfileRank] = useState(null);
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [addingSkill, setAddingSkill] = useState("");
  const navigate = useNavigate();

  // TODO: replace this with real data
  const courses = [
    {
      name: "Computer Science",
      image: BookImage,
      description: "Learn about computer science and programming",
      link: "#nowhere",
    },
    {
      name: "Mathematics",
      image: BookImage,
      description: "Learn about mathematics and statistics",
      link: "#nowhere",
    },
    {
      name: "Physics",
      image: BookImage,
      description: "Learn about physics and mechanics",
      link: "#nowhere",
    },
    {
      name: "Chemistry",
      image: BookImage,
      description: "Learn about chemistry and organic chemistry",
      link: "#nowhere",
    },
  ];

  // TODO: remove this
  console.log(profileData);

  const getAiSuggestions = async () => {
    setLoading(true);
    authService
      .getProfileSuggestions()
      .then((data) => {
        if (data) {
          setAiSuggestions(data);
        } else {
          setAiSuggestions(null);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    authService
      .getProfileRank()
      .then((data) => {
        if (data) {
          setProfileRank(data.rank);
        } else {
          setProfileRank("Error");
        }
      })
      .finally(() => setLoading(false));
  }, [profileData]);

  const addSkill = async () => {
    navigate("/dashboard/add-skill/" + addingSkill);
  };

  return (
    <>
      {/* Content */}
      <Container>
        {loading && <Loader />}
        <div className="flex flex-row mt-4 gap-2">
          {/* Profile */}
          <div className="w-1/4">
            <div className="flex flex-col gap-4 border-2 p-4 rounded">
              <img
                src={StudentImage}
                alt="student"
                className="rounded-full border-[1px] border-blue-500"
              />
              <div className="flex flex-col items-center">
                <h3 className="text-2xl font-semibold">
                  {profileData.user.fullName}
                </h3>
                {profileData.role && (
                  <h4 className="text-base font-semibold text-gray-800">
                    {profileData.role}
                  </h4>
                )}
                <a
                  className="underline text-gray-600 text-sm italic"
                  href={`mailto:${profileData.user.email}`}
                >
                  {profileData.user.email}
                </a>
              </div>
              {profileData.objective && (
                <p className="text-sm text-gray-600">{profileData.objective}</p>
              )}
              <p className="text-sm">{profileData.place}</p>
              <p className="text-sm">Projects: {profileData.projects.length}</p>
              <p className="text-sm">
                Courses: {profileData.trainingCourses.length}
              </p>
              <p className="text-sm">
                Job experiences: {profileData.workExperience.length}
              </p>
              {/* TODO: Skills */}
              {profileData.skills.length > 0 && (
                <div className="flex flex-wrap gap-1 items-center">
                  <p className="text-sm">Skills: </p>
                  {profileData.skills.map((skill) => (
                    <p
                      className="text-xs bg-blue-500 text-white py-1 px-2 w-fit rounded"
                      key={skill}
                    >
                      {skill}
                    </p>
                  ))}
                </div>
              )}
              {isAddingSkill && (
                <div className="flex flex-row gap-2">
                  <input
                    type="text"
                    className="border-2 p-2 rounded"
                    placeholder="Add skills"
                    value={addingSkill}
                    onChange={(e) => setAddingSkill(e.target.value)}
                  />
                  <button
                    onClick={addSkill}
                    className="border-2 p-2 rounded-full"
                  >
                    +
                  </button>
                </div>
              )}
              <button
                onClick={() => {
                  setIsAddingSkill(!isAddingSkill);
                }}
                className="text-sm bg-blue-500 text-white py-1 px-2 w-fit rounded"
              >
                {isAddingSkill ? "Cancel" : "Add skills"}
              </button>
            </div>
          </div>

          {/* Dashboard */}
          <div className="w-3/4">
            <div className="flex flex-wrap gap-4 border-2 p-4 rounded items-center">
              {/* Profile Score */}
              <div className="border-2 p-4 flex flex-col justify-center items-center gap-4 h-fit">
                <h3 className="text-4xl font-base">Profile Score</h3>
                <div className="rounded-full text-7xl border-4 border-blue-500 w-40 h-40 flex items-center justify-center">
                  {profileData.profileScore}
                </div>
              </div>

              {/* Ranking */}
              <div className="border-2 p-4 flex flex-col justify-center items-center gap-4 h-fit">
                <h3 className="text-4xl font-base">Ranking</h3>
                <div className="rounded-full text-7xl border-4 border-blue-500 w-40 h-40 flex items-center justify-center">
                  #{profileRank}
                </div>
              </div>

              {/* AI Suggestions */}
              <div className="border-2 p-4 flex flex-col justify-center items-center gap-4">
                <h3 className="text-4xl font-base">AI Suggestions</h3>
                <div className="text-sm w-80 h-fit flex items-center justify-center p-4">
                  {aiSuggestions ? (
                    <ul className="list-disc">
                      {aiSuggestions.suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                  ) : (
                    <button
                      onClick={getAiSuggestions}
                      className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition"
                    >
                      Get AI Suggestions
                    </button>
                  )}
                </div>
              </div>

              {/* Courses recommendations */}
              <div className="border-2 p-4 flex flex-col justify-center w-full overflow-auto">
                <h3 className="text-2xl font-base">Courses Recommendations</h3>
                <div className="flex flex-row p-4 gap-4 overflow-auto">
                  {courses.map((course) => (
                    <a
                      key={course.name}
                      href={course.link}
                      className="min-w-80 h-fit shadow-xl"
                    >
                      <img src={course.image} alt="course" className="" />
                      <div className="p-4">
                        <h4 className="text-lg font-semibold">{course.name}</h4>
                        <p className="text-sm text-gray-500">
                          {course.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Dashboard;
