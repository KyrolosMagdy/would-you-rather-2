import React from "react";
import notFoundImage from "../../assets/404.png";

const notFound = () => {
  return (
    <div className="not-found__container">
      <img src={notFoundImage} alt="not-found-page" className="notFoundImage" />
      <div className="text-container">
        <h1 className="not-found-title"> This page is wrong </h1>
        <h3>
          You have been trying for ten minutes. It’s pretty late at night and
          pretty dark in your room. You reach over and flick on a lamp. You feel
          oh so stupid. The gap in the toy is a triangle and you only have the
          cylinder and cube pieces. In dismay you toss the toy aside. Curse your
          five year old’s inability to keep track of the triangle!
        </h3>
      </div>
    </div>
  );
};

export default notFound;
