import React from "react";
import Container from "../../layouts/Container";
import { Link, NavLink, useParams } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import PaperImage from "../../assets/paper.png";

const Tests = () => {
  const { testID } = useParams();

  return (
    <>
      {/* List of tests */}
      <Container className="mt-10">
        <h1 className="text-3xl">{testID}</h1>
      </Container>
    </>
  );
};

export default Tests;
