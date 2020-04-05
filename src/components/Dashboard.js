import React from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axios";
import Header from "./Header";
import WorkoutCard from "./WorkoutCard";
import "../css/Dashboard.css";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workoutData: [],
      errorMessage: ""
    };
  }

  componentDidMount() {
    this.setState({
      errorMessage: ""
    });
    this.getWorkouts();
  }

  getWorkouts = async () => {
    try {
      const allWorkouts = await axios.get("/dashboard");
      const { data } = await allWorkouts;
      this.setState({
        status: 200,
        workoutData: data
      });
      return { data };
    } catch (error) {
      this.setState({
        errorMessage: "unable to find workouts"
      });
    }
  };

  render() {
    return (
      <div>
        <div>
          <Header title={"HIIT ME UP BOARD"} />
          <div className="dashboard__nav">
            <Link to="/set-workout">
              <button aria-label="hmu-button">HIIT ME UP</button>
            </Link>
          </div>
        </div>
        <div className="dashboard">
          {this.state.workoutData.map(workout => WorkoutCard(workout))}
        </div>
      </div>
    );
  }
}

export default Dashboard;
