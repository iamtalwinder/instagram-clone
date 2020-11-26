import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Start from "./pages/Start";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Activity from "./pages/Activity";
import Account from "./pages/Account";
import EditProfile from "./pages/EditProfile";
import NewPost from "./pages/NewPost";
import { ContextProvider as LoggedInUserContextProvider } from "./context/LoggedInUser";
import { ContextProvider as VisitedUserContextProvider } from "./context/VisitedUser";
import { ContextProvider as PostsContextProvider } from "./context/Posts";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <LoggedInUserContextProvider>
          <Route exact path="/">
            <Start />
          </Route>
          <Route exact path="/signin">
            <Signin />
          </Route>
          <Route exact path="/home">
            <PostsContextProvider>
              <Home />
            </PostsContextProvider>
          </Route>
          <Route exact path="/explore">
            <Explore />
          </Route>
          <Route exact path="/activity">
            <Activity />
          </Route>
          <VisitedUserContextProvider>
            <Route exact path="/account">
              <Account />
            </Route>
          </VisitedUserContextProvider>
          <Route exact path="/edit-profile">
            <EditProfile />
          </Route>
          <Route exact path="/new-post">
            <NewPost />
          </Route>
        </LoggedInUserContextProvider>
      </Switch>
    </Router>
  );
}

export default App;
