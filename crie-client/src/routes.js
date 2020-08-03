import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Ideas from "./pages/Ideas";
import Ranking from "./pages/Ranking";

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/forgotpassword" component={ForgotPassword} />
      <Route path="/" exact component={Home} />
      <Route path="/ideas" component={Ideas} />
      <Route path="/ranking" component={Ranking} />
    </BrowserRouter>
  );
}

export default Routes;
