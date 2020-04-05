import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import "../css/Home.css";

const HiitMeUp = () => {
  return (
    <div className="home">
      <Link to="/set-workout">
        <button className="hitt-me" aria-label="hmu-button">
          HIIT ME UP
        </button>
      </Link>
    </div>
  );
};

const About = () => {
  return (
    <div className="about" aria-label="about-info">
      {
        <p>
          HIIT ME UP is an exercise generator that makes getting that next
          workout done effortlessly &#9786; Please feel free to send your
          feedback for improvements or other features{" "}
          <a href="mailto:vallq@outlook.com">here</a>!
        </p>
      }
    </div>
  );
};

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      displayAbout: false
    };
  }

  toggleAbout = event => {
    this.setState(prevState => {
      const displayAbout = prevState.displayAbout;
      return { displayAbout: !displayAbout };
    });
  };

  render() {
    return (
      <div>
        <Header title={`click the button below`} />
        <div className="home-box" aria-label="home">
          {!this.state.displayAbout ? HiitMeUp() : About()}
        </div>
        <div className="about-box">
          <button onClick={this.toggleAbout} aria-label="about-button">
            {!this.state.displayAbout ? "about" : "go back"}
          </button>
          <Link to="/dashboard">
            <button aria-label="dashboard-button">dashboard</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
