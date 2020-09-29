import React, { useEffect } from "react";
import "./App.css";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard.component";
import LeaderBoard from "./Pages/LeaderBoard/LeaderBoard.component";
import Login from "./Pages/Login/Login.component";
import NewQuestion from "./Pages/NewQuestion/NewQuestion.component";
import NavigationBar from "./components/NavigationBar/NavigationBar.component";
import MainNavBar from "./components/NavBar/MainNav.component";
import { handleInitialData } from "./redux/actions/shared";
import notFound from "./Pages/404/notFound";
import Question from "./Pages/question/question.page";

const App = ({ notLoggedIn, users, handleInitialData }) => {
  useEffect(() => {
    handleInitialData();
  }, [handleInitialData]);

  return (
    <Router>
      <NavigationBar />
      <MainNavBar />
      <Switch>
        {notLoggedIn ? (
          <Route exact path="/" component={Login} />
        ) : (
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/leaderboard" component={LeaderBoard} />
            <Route path="/add" component={NewQuestion} />
            <Route path="/questions/:questionId" exact component={Question} />
            <Route component={notFound} />
          </Switch>
        )}
        <Route component={notFound} />
      </Switch>
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
