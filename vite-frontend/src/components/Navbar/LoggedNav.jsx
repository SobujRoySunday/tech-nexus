import React from "react";
import Container from "../../layouts/Container";
import { NavLink } from "react-router-dom";
import LogoutButton from "../LogoutButton/LogoutButton";

const LoggedNav = () => {
  return (
    <>
      {/* Navbar */}
      <div className="w-screen bg-gray-100 border-b-[1px] border-gray-300">
        <Container>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2 items-center justify-center">
              <NavLink
                to="/explore"
                className={`text-base py-3 px-2 text-gray-500 hover:text-black transition`}
              >
                Explore
              </NavLink>
              <NavLink
                to="/leaderboard"
                className={`text-base py-3 px-2 text-gray-500 hover:text-black transition`}
              >
                Leaderboard
              </NavLink>
              <NavLink
                to="/tests"
                className={`text-base py-3 px-2 text-gray-500 hover:text-black transition`}
              >
                Tests
              </NavLink>
            </div>
            <div className="flex flex-row gap-2 items-center justify-center">
              <NavLink
                to="/profile"
                className={`text-sm py-3 px-2 text-gray-500 hover:text-black transition`}
              >
                Profile
              </NavLink>
              <LogoutButton className="text-gray-500 hover:text-black transition" />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default LoggedNav;
