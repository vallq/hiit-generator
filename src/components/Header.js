import React from "react";
import "./Header.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title
    };
  }
  render() {
    return (
      <div className="header">
        <h2>{this.state.title}</h2>
      </div>
    );
  }
}

export default Header;
