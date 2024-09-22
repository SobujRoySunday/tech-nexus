import React from "react";
import Container from "../../layouts/Container";
import { Link, NavLink } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import PaperImage from "../../assets/paper.png";

const Tests = () => {
  return (
    <>
      {/* List of tests */}
      <Container className="mt-10">
        <div className="w-full border-2 flex flex-row p-2">
          <div className="w-5/6 p-5 flex flex-col gap-2">
            <h3 className="text-4xl">Full-stack engineer test (JavaScript)</h3>
            <p className="text-lg text-gray-700">
              This is a test for full-stack engineers who works in JavaScript
            </p>
            <p className="text-lg text-gray-700">No. of papers: 5</p>
            <p className="text-lg text-gray-700">Total Duration: 600 Minutes</p>
            <p className="text-lg text-gray-700">
              Badge Name: JavaScript Full-stack Engineer
            </p>
            <Link
              to="/tests/1"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit"
            >
              Attempt
            </Link>
          </div>
          <div className="w-1/6 flex flex-col items-center justify-center ">
            <img src={PaperImage} alt="paper" className="w-full opacity-20" />
            <div className="text-3xl">FM: 300</div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Tests;
