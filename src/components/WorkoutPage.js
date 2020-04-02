import React from "react";
import { Link } from "react-router-dom";
import BaseTimer from "./BaseTimer";
import "../css/WorkoutPage.css";
import WorkoutGenerator from "../functions/WorkoutGenerator.js";
const SECONDS_IN_ONE_MINUTE = 60;
const EXERCISE_DURATION = 30;
const EXERCISE_MIN = 0;
const startTime = Date.now();

class WorkoutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exerciseMin: EXERCISE_MIN,
      exerciseSec: EXERCISE_DURATION,
      startTime: startTime
    };
  }

  render() {
    const queries = new URLSearchParams(this.props.location.search);
    const time = queries.get("time");
    const focus = queries.get("focus");
    const name = queries.get("name");
    const timeInMin = time / SECONDS_IN_ONE_MINUTE;
    const timeInSec = (time / SECONDS_IN_ONE_MINUTE) % timeInMin;

    return (
      <div aria-label="workout-page">
        <div className="workout-page__nav-buttons">
          <Link to="/set-workout">
            <button aria-label="reset-button">&#9665; Reset Workout</button>
          </Link>
          <Link to="/home">
            <button aria-label="home-button">Go to Home &#9655;</button>
          </Link>
        </div>
        <div>
          <h3>Hello, {name}</h3>
        </div>
        <div className="workout-timer" aria-label="workout-timer">
          <BaseTimer
            minutes={timeInMin}
            seconds={timeInSec}
            duration={time}
            startTime={this.state.startTime}
            isExerciseTimer={false}
          />
        </div>
        <div className="exercise-card" aria-label="exercise-card">
          <WorkoutGenerator
            focus={focus}
            time={time}
            duration={EXERCISE_DURATION}
            startTime={this.state.startTime}
          />
        </div>
      </div>
    );
  }
}

export default WorkoutPage;
