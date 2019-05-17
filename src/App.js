import React from "react";
import { Navbar, Button } from "react-bootstrap";
import "./App.css";

class App extends React.Component {
  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  componentDidMount() {
    const { renewSession } = this.props.auth;

    if (localStorage.getItem("isLoggedIn") === "false") {
      renewSession();
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">React Auth0</a>
            </Navbar.Brand>
            {!isAuthenticated() && (
              <Button
                id="qsLoginBtn"
                bsStyle="primary"
                className="btn-margin"
                onClick={this.login.bind(this)}
              >
                Log In
              </Button>
            )}
            {isAuthenticated() && (
              <Button
                bsStyle="primary"
                className="btn-margin"
                onClick={this.goTo.bind(this, "home")}
              >
                Home
              </Button>
            )}
          </Navbar.Header>
        </Navbar>
      </div>
    );
  }
}

export default App;
