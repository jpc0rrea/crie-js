import React from "react";

import "./styles.css";

const loginImg = require("../../assets/images/landing.svg");

const InitialSkeleton = (props) => {
  return (
    <div id="page-login">
      <div id="page-login-content">
        <div id="left-side">{props.children}</div>
        <div id="right-side">
          <img id="login-image" src={loginImg} alt="Inovação" />
        </div>
      </div>
    </div>
  );
};

export default InitialSkeleton;
