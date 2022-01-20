import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import NewPlaces from "./places/pages/NewPlaces";
import Users from "./user/pages/Users";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces"
const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main></main>
      <Switch>
      <Route path="/" exact>
        <Users />
      </Route>
      <Route path="/places/new" exact>
        <NewPlaces />
      </Route>
      <Route path="/:userId/places" exact>
         <UserPlaces />
      </Route>
      <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
