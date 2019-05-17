import React from "react";

class Home extends React.Component {
  login() {
    this.props.auth.login();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {isAuthenticated() ? (
          <h4>Brother, You are logged in!</h4>
        ) : (
          <h4>
            Brother, You are not logged in! Please{" "}
            <a style={{ cursor: "pointer" }} onClick={this.login.bind(this)}>
              Log In
            </a>{" "}
            to continue.
          </h4>
        )}
      </div>
    );
  }
}

export default Home;
