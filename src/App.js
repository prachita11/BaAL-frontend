import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Main from "./Main";
import Developer from "./DevelopersPortal";

const App = () => {
  return (
    <Router className="main">
      <Switch>
        <Route exact path="/" component={Main}></Route>
        <Route path="/api" component={Developer}></Route>
      </Switch>
    </Router>
  );
};
export default App;
