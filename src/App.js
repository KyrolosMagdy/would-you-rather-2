import React, { useEffect } from "react";
import "./App.css";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard.component";
import LeaderBoard from "./Pages/LeaderBoard/LeaderBoard.component";
import Login from "./Pages/Login/Login.component";
import NewQuestion from "./Pages/NewQuestion/NewQuestion.component";
import NavigationBar from "./components/NavigationBar/NavigationBar.component";
import MainNavBar from "./components/NavBar/MainNav.component";
import { handleInitialData } from "./redux/actions/shared";

const App = ({ notLoggedIn, users, handleInitialData }) => {
  useEffect(() => {
    handleInitialData();
  }, [handleInitialData]);

  return (
    <Router>
      <NavigationBar />
      <MainNavBar />
      {notLoggedIn ? (
        <Route exact path="/" component={Login} />
      ) : (
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/leaderboard" exact component={LeaderBoard} />
          <Route path="/add" exact component={NewQuestion} />
        </Switch>
      )}
    </Router>
  );
};

const mapStateToProps = state => ({
  notLoggedIn: state.authedUser.notLoggedIn,
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  handleInitialData: () => dispatch(handleInitialData())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
