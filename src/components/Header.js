import React from "react";
import "../css/Header.css";

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
        <h1>{this.state.title}</h1>
      </div>
    );
  }
}

export default Header;
