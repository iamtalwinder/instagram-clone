import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Activity from "./pages/Activity";
import MyAccount from "./pages/MyAccount";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Signin />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/explore">
          <Explore />
        </Route>
        <Route exact path="/activity">
          <Activity />
        </Route>
        <Route exact path="/myaccount">
          <MyAccount />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
