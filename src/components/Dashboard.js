import React from "react";
import axios from "../utils/axios";
import WorkoutCard from "./WorkoutCard";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userQuery: "",
      status: "",
      isLoading: false,
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
        <h3> HIIT ME UP Board</h3>
        <div></div>
        <div className="dashboard">
          {this.state.workoutData.map(workout => WorkoutCard(workout))}
        </div>
      </div>
    );
  }
}

export default Dashboard;
