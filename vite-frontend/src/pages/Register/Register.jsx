import React from "react";
import Container from "../../layouts/Container";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const Register = () => {
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    authService
      .register(formData)
      .then((res) => {
        if (res === 201) {
          console.log("User created");
          navigate("/");
        } else if (res === 409) {
          console.log("User conflict");
        } else if (res === 400) {
          console.log("Bad request");
        } else if (res === 500) {
          console.log("Server error");
        } else {
          console.log("Unknown error");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <Container>
      {loading && <Loader />}
      <div className="flex justify-center items-center py-44">
        <form
          className="border-2 border-black p-12 flex flex-col"
          onSubmit={handleSubmit}
        >
          <h2 className="text-center text-3xl mb-6">Create your account</h2>

          <div className="mb-4">
            <label className="text-sm text-gray-500" htmlFor="full-name">
              Full Name:
            </label>
            <input
              className="border-2 border-black py-2 px-3 w-full"
              type="text"
              placeholder="Enter your full name"
              id="full-name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="text-sm text-gray-500" htmlFor="email">
              Email:
            </label>
            <input
              className="border-2 border-black py-2 px-3 w-full"
              type="text"
              placeholder="Enter your email-id"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label className="text-sm text-gray-500" htmlFor="password">
              Password:
            </label>
            <input
              className="border-2 border-black py-2 px-3 w-full"
              type="password"
              placeholder="Enter your password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button className="bg-blue-500 text-white py-2 px-4 hover:bg-blue-600 transition">
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </Container>
  );
};

export default Register;
