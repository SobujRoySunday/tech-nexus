import "./Home.css";
import Container from "../../layouts/Container";
import Navbar from "../../components/Navbar/Navbar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import LoginImage from "../../assets/studying.png";
import AboutImage from "../../assets/elearning-vector.png";
import ProcessImage from "../../assets/process.png";
import { useState } from "react";
import authService from "../../services/auth.service";
import { useSelector } from "react-redux";
import { login, loginProfile } from "../../store/authSlice";
import Loader from "../../components/Loader/Loader";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    authService
      .login(formData)
      .then((res) => {
        if (res === 200) {
          navigate(0);
        } else if (res === 404) {
          console.log("User not found");
        } else if (res === 401) {
          console.log("Wrong password");
        } else if (res === 500) {
          console.log("Server error");
        } else {
          console.log("Unknown error");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      {loading && <Loader />}
      {/* Hero section */}
      <div className="w-[99.1406vw] h-screen bg-lime-300 hero">
        <Container>
          <div className="py-[24rem] flex flex-col justify-center items-center gap-4">
            <h1 className="text-6xl">Connecting Skills with Opportunities</h1>
            <h2 className="text-[1.33rem]">
              Empowering Professionals to{" "}
              <span className="text-blue-500">Connect, Grow and Find</span> the
              Perfect Opportunities for their Unique Skills
            </h2>
            <NavLink
              to="/register"
              className="border-2 border-blue-500 py-2 px-4 hover:bg-blue-500 hover:text-white transition"
            >
              Create Account
            </NavLink>
          </div>
        </Container>
      </div>
      <Container>
        {/* Login form */}
        <div className="p-16 flex flex-row justify-center items-center gap-8">
          <img src={LoginImage} className="w-1/2" />
          <div className="flex flex-col gap-4 w-1/2">
            <h3 className="text-5xl">Log in</h3>
            <p className="text-sm text-gray-500">
              or{" "}
              <Link to="/register" className="underline">
                Don&apos;t have an account?
              </Link>
            </p>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="text-sm text-gray-500" htmlFor="email">
                  Email:
                </label>
                <input
                  className="border-2 border-black py-2 px-3 w-full"
                  type="text"
                  placeholder="someone@skillsync.com"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
              <div className="mb-4">
                <label className="text-sm text-gray-500" htmlFor="password">
                  Password:
                </label>
                <input
                  className="border-2 border-black py-2 px-3 w-full"
                  type="password"
                  placeholder="xxxxxxxx"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                />
              </div>
              <div>
                <button className="bg-blue-500 text-white py-2 px-4 hover:bg-blue-600 transition">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* TODO: About us */}
        <div className="p-16 flex flex-row justify-center items-center gap-8">
          <div className="w-2/3 flex flex-col gap-4">
            <h3 className="text-5xl">About Us</h3>
            <p className="text-lg text-gray-500">
              At SkillSync, we believe that every individual has the potential
              to excel in their career with the right opportunities and
              guidance. Our platform is designed to bridge the gap between
              aspiring professionals and the dynamic demands of today&apos;s job
              market.
            </p>
            <p className="text-lg text-gray-500">
              SkillSync provides personalized career development tools, helping
              users align their skills, education, and experiences with industry
              needs. Whether you&apos;re a student just starting out or a
              professional looking to advance your career, SkillSync offers
              tailored job recommendations, training resources, and skill
              assessments to ensure you&apos;re always on the right track.
            </p>
          </div>
          <img className="w-1/3" src={AboutImage}></img>
        </div>

        {/* Usage roadmap */}
        <img className="p-16" src={ProcessImage} />

        {/* Footer */}
        <Footer />
      </Container>
    </>
  );
};

export default Home;
