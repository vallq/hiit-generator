import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Home from "./components/Home";
import SetWorkout from "./components/SetWorkout";
import WorkoutPage from "./components/WorkoutPage";
import Dashboard from "./components/Dashboard";

import "./App.css";
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/set-workout" component={SetWorkout} />
            <Route path="/workout" component={WorkoutPage} />
            <Route path="/dashboard" component={Dashboard} />
            <Redirect to="/home" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
