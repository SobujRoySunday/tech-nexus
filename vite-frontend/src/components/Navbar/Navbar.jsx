import React from "react";
import { NavLink } from "react-router-dom";
import Container from "../../layouts/Container";

const Navbar = () => {
  return (
    <Container className="absolute top-0">
      <nav className="flex justify-between items-center p-4">
        <h2 className="text-2xl">
          <NavLink to="/">SkillSync</NavLink>
        </h2>
        <div className="flex space-x-4">
          <NavLink
            to="register"
            className={`text-blue-500 py-2 px-4 font-bold border-b-2 border-[#ffffff00] hover:border-blue-500 transition`}
          >
            SIGN UP
          </NavLink>
        </div>
      </nav>
      <hr />
    </Container>
  );
};

export default Navbar;
