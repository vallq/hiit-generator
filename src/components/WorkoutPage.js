import React from "react";
import { Link } from "react-router-dom";
import BaseTimer from "./BaseTimer";
import Header from "./Header";
import {
  upperBodyExerciseData,
  lowerBodyExerciseData
} from "../constants/exerciseData";
import axios from "../utils/axios";
import "../css/WorkoutPage.css";
const NUMBER_OF_SETS = 5;
const SECONDS_IN_ONE_MINUTE = 60;
const EXERCISE_DURATION = 30;
const EXERCISE_MIN = 0;

class WorkoutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false,
      exerciseMin: EXERCISE_MIN,
      exerciseSec: EXERCISE_DURATION,
      startTime: 0,
      name: "",
      focus: "",
      time: 0,
      exerciseNames: [],
      gifNames: [],
      currentIndex: 0,
      nextIndex: 1
    };
    this.workoutIntervalId = 0;
  }

  repeatExerciseTimer = () => {
    return this.state.time / EXERCISE_DURATION - 1;
  };

  generateExerciseArray = (numberOfExercises, exerciseData) => {
    var exercises = [];
    var gifNames = [];

    for (let i = 0; i < numberOfExercises; i++) {
      const targetId = Math.floor(exerciseData.length * Math.random());
      exercises.push(exerciseData[targetId].name);
      gifNames.push(exerciseData[targetId].gif);
      exerciseData.splice(targetId, 1);
    }

    this.setState({
      gifNames: gifNames
    });

    return exercises;
  };

  generateWorkout = (time, focus) => {
    const totalNumberOfExercises = time / EXERCISE_DURATION;
    const numberOfExercises = totalNumberOfExercises / NUMBER_OF_SETS;
    switch (focus) {
      case "upper body": {
        return this.generateExerciseArray(
          numberOfExercises,
          upperBodyExerciseData
        );
      }
      case "lower body": {
        return this.generateExerciseArray(
          numberOfExercises,
          lowerBodyExerciseData
        );
      }
      default: {
        throw new Error("No Exercise Generated");
      }
    }
  };

  updateExerciseInterval = () => {
    return setInterval(() => {
      let currIdx = this.state.nextIndex;
      let nextIdx = this.state.nextIndex + 1;
      if (currIdx === this.state.exerciseNames.length - 1) {
        nextIdx = 0;
      }
      this.setState({
        currentIndex: currIdx,
        nextIndex: nextIdx
      });
    }, 30000);
  };

  postWorkout = async () => {
    try {
      const date = new Date();
      const workoutToPost = {
        name: this.state.name,
        exercises: this.state.exerciseNames,
        duration: this.state.time,
        date: date.toDateString(),
        time: date.toLocaleTimeString(),
        dateTimeObj: date.toString()
      };
      await axios.post("/dashboard", workoutToPost);
    } catch (err) {
      if (err.response.status === 400) {
        alert("Bad request!");
      }
      return err;
    }
  };

  componentDidMount() {
    const queries = new URLSearchParams(this.props.location.search);
    const time = queries.get("time");
    const focus = queries.get("focus");
    const name = queries.get("name");
    this.setState({
      mounted: true,
      startTime: Date.now(),
      name: name,
      focus: focus,
      time: time,
      exerciseNames: this.generateWorkout(time, focus)
    });
    this.workoutIntervalId = this.updateExerciseInterval();
  }

  componentWillUnmount() {
    clearInterval(this.workoutIntervalId);
  }

  renderHeaderAndNav() {
    return (
      <div>
        <Header title={`HIIT ME UP GENERATOR`} />
        <div className="workout-page__nav-buttons">
          <Link to="/set-workout">
            <button aria-label="reset-button">&#9665; Reset Workout</button>
          </Link>
          <Link to="/home">
            <button aria-label="home-button">Go to Home &#9655;</button>
          </Link>
        </div>
      </div>
    );
  }

  render() {
    const timeInMin = this.state.time / SECONDS_IN_ONE_MINUTE;
    const timeInSec = (this.state.time / SECONDS_IN_ONE_MINUTE) % timeInMin;

    if (!this.state.mounted) {
      return (
        <div aria-label="workout-page">
          {this.renderHeaderAndNav()}
          <div>
            <h3>Unable to access workout page at the moment</h3>
          </div>
        </div>
      );
    }

    return (
      <div aria-label="workout-page">
        {this.renderHeaderAndNav()}
        <div className="top-render">
          <h2>Hello, {this.state.name}</h2>
          <div className="timer" aria-label="workout-timer">
            <BaseTimer
              minutes={timeInMin}
              seconds={timeInSec}
              duration={this.state.time}
              startTime={this.state.startTime}
              isExerciseTimer={false}
            />
          </div>
        </div>

        <div className="exercise-card" aria-label="exercise-card">
          <div className="current-exercise-render">
            <h3>current exercise</h3>
            <iframe
              alt={this.state.exerciseNames[this.state.currentIndex]}
              title="exercise-gif"
              src={this.state.gifNames[this.state.currentIndex]}
            ></iframe>
            <span>
              <a href="https://giphy.com/">via GIPHY</a>
            </span>
            <h3>
              {this.state.exerciseNames
                ? this.state.exerciseNames[this.state.currentIndex]
                : "No Exercise"}
            </h3>
            <div className="timer" aria-label="exercise-timer">
              <BaseTimer
                minutes={0}
                seconds={EXERCISE_DURATION}
                duration={EXERCISE_DURATION}
                startTime={this.state.startTime}
                isExerciseTimer={true}
                repeatedCount={this.repeatExerciseTimer()}
              />
            </div>
          </div>
          <div className="bottom-row">
            <div className="next-exercise-render">
              <h5>
                next exercise: <br></br>{" "}
                {this.state.exerciseNames[this.state.nextIndex]}
              </h5>
              <Link to="/dashboard">
                <button onClick={this.postWorkout} aria-label="save-button">
                  Save Workout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WorkoutPage;
