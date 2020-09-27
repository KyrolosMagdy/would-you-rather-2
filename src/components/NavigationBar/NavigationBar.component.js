import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HelpOutlineRoundedIcon from "@material-ui/icons/HelpOutlineRounded";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import BallotRoundedIcon from "@material-ui/icons/BallotRounded";
import MeetingRoomRoundedIcon from "@material-ui/icons/MeetingRoomRounded";
import { connect } from "react-redux";
import { handleNavBarState } from "../../redux/actions/toggleNavBar";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { unsetAuthedUser } from "../../redux/actions/authedUser";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

const NavigationBar = ({
  isNavOpen,
  handleNavBarState,
  notLoggedIn,
  unsetAuthedUser,
  history
}) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: true,
    bottom: false,
    right: false
  });

  const handleLogoutButton = () => {
    unsetAuthedUser();
    handleNavBarState();
    history.push("/");
  };

  const handleHomeButton = () => {
    handleNavBarState();
    history.push("/");
  };

  const handleNewQuestionButton = () => {
    handleNavBarState();
    history.push("/add");
  };

  const handleLeaderBoardButton = () => {
    handleNavBarState();
    history.push("/leaderboard");
  };

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = anchor => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom"
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem
          button
          key={"Would You Rather?"}
          onClick={() => handleHomeButton()}
        >
          <ListItemIcon>
            <HomeRoundedIcon />
          </ListItemIcon>
          <ListItemText primary={"Would You Rather?"} />
        </ListItem>
      </List>
      <Divider />
      {notLoggedIn ? (
        <List>
          <ListItem button key={"Login"} onClick={() => history.push("/")}>
            <ListItemIcon>
              <VpnKeyIcon />
            </ListItemIcon>
            <ListItemText primary={"Login"} />
          </ListItem>
        </List>
      ) : (
        <List>
          <List>
            <ListItem
              button
              key={"New Question"}
              onClick={() => handleNewQuestionButton()}
            >
              <ListItemIcon>
                <HelpOutlineRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={"New Question"} />
            </ListItem>
            <ListItem
              button
              key={"LeaderBoard"}
              onClick={() => handleLeaderBoardButton()}
            >
              <ListItemIcon>
                <BallotRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={"LeaderBoard"} />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem
              button
              key={"Logout"}
              onClick={() => handleLogoutButton()}
            >
              <ListItemIcon>
                <MeetingRoomRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
          </List>
        </List>
      )}
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <Drawer
          anchor={"left"}
          open={isNavOpen}
          onClose={() => handleNavBarState()}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

const mapStateToProps = state => ({
  isNavOpen: state.handleNavbarReducer.isNavOpen,
  notLoggedIn: state.authedUser.notLoggedIn
});

const mapDispathToProps = dispatch => ({
  handleNavBarState: () => dispatch(handleNavBarState()),
  unsetAuthedUser: () => dispatch(unsetAuthedUser())
});

export default withRouter(
  connect(mapStateToProps, mapDispathToProps)(NavigationBar)
);
