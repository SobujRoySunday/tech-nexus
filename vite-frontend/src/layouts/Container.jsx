import React from "react";

const Container = ({ children, className = "" }) => {
  return (
    <div className={`${className} w-full`}>
      <div className={`w-[60vw] mx-auto`}>{children}</div>
    </div>
  );
};

export default Container;
