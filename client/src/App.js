import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Activity from "./pages/Activity";
import Account from "./pages/Account";
import { UserContextProvider } from "./context/user";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <UserContextProvider>
          <Route exact path="/">
            <Signin />
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
          <Route exact path="/account">
            <Account />
          </Route>
        </UserContextProvider>
      </Switch>
    </Router>
  );
}

export default App;
