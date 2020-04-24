import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import "../css/SetWorkout.css";
const MIN_IN_SECONDS = 60;

class SetWorkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayAbout: false,
      time: 0,
      focus: "",
      name: "",
    };
  }

  handleTimeClick = (event) => {
    this.setState({
      time: event.target.value,
    });
  };

  handleFocusClick = (event) => {
    this.setState({
      focus: event.target.value,
    });
  };

  updateName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  constructQueryString(time, focus, name, link) {
    const queryArr = [time, focus, name];
    var queryURL = link.concat(
      "time=",
      queryArr[0],
      "&",
      "focus=",
      queryArr[1],
      "&",
      "name=",
      queryArr[2]
    );
    return queryURL;
  }

  render() {
    const link = "./workout?";
    const queryURL = this.constructQueryString(
      this.state.time,
      this.state.focus,
      this.state.name,
      link
    );

    return (
      <div>
        <Header title={`HIIT ME UP GENERATOR`} />
        <div className="workout-params" aria-label="set-workout-params">
          <div className="set-workout-card">
            <h2>Set Workout</h2>
            <input
              className="input-field"
              placeholder="enter your name"
              onChange={this.updateName}
            ></input>
            <div className="set-time">
              <h3 aria-label="time">
                Time(min): {this.state.time / MIN_IN_SECONDS}
              </h3>
              <div className="set-time__buttons">
                <button
                  value={900}
                  onClick={this.handleTimeClick}
                  aria-label="15-min-button"
                >
                  15min
                </button>
              </div>
            </div>
            <div className="set-focus">
              <h3 aria-label="focus">Focus: {this.state.focus}</h3>
              <div className="set-focus__buttons">
                <button
                  value="upper body"
                  onClick={this.handleFocusClick}
                  aria-label="upper-body-button"
                >
                  upper body
                </button>
                <button
                  value="lower body"
                  onClick={this.handleFocusClick}
                  aria-label="lower-body-button"
                >
                  lower body
                </button>
              </div>
            </div>
          </div>

          <div className="workout-params__nav-buttons" aria-label="home-button">
            <Link to="/home">
              <button>&#9665; Home</button>
            </Link>
            <Link to={queryURL}>
              <button
                className="workout-params__generate-button"
                aria-label="generate-button"
              >
                Generate &#9655;
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default SetWorkout;
