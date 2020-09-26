import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { connect } from "react-redux";
import { handleNavBarState } from "../../redux/actions/toggleNavBar";
import Avatar from "@material-ui/core/Avatar";
import { unsetAuthedUser } from "../../redux/actions/authedUser";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    cursor: "pointer"
  },
  container: {
    backgroundColor: "#2196f3"
  },
  rootAvatar: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  avatrContainer: {
    display: "flex",
    alignItems: "center"
  },
  logoutButton: {
    marginLeft: "4rem",
    cursor: "pointer"
  }
}));

const MainNavBar = ({
  handleNavBarState,
  notLoggedIn,
  userId,
  users,
  unsetAuthedUser,
  history
}) => {
  const classes = useStyles();

  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    setCurrentUser(users[userId]);
  }, [userId, users]);

  const handleLogoutButton = () => {
    unsetAuthedUser();
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.container}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => handleNavBarState()}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            className={classes.title}
            onClick={() => history.push("/")}
          >
            Would You Rather?
          </Typography>
          {notLoggedIn ? (
            <Button color="inherit" onClick={() => history.push("/")}>
              Login
            </Button>
          ) : (
            <div className={classes.avatrContainer}>
              <Avatar
                alt="Travis Howard"
                src={currentUser && currentUser.avatarURL}
              />
              <Button color="inherit" onClick={() => handleLogoutButton()}>
                Logout
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapDispathToProps = dispatch => ({
  handleNavBarState: () => dispatch(handleNavBarState()),
  unsetAuthedUser: () => dispatch(unsetAuthedUser())
});

const mapStateToProps = state => ({
  notLoggedIn: state.authedUser.notLoggedIn,
  userId: state.authedUser.userId,
  users: state.users
});

export default withRouter(
  connect(mapStateToProps, mapDispathToProps)(MainNavBar)
);
