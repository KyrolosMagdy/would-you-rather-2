import React from "react";
import { connect } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import QuestionDetails from "../QuestionDetails/QuestionDetails.component";

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    marginTop: "3rem"
  },
  tableContainer: {
    width: "50%",
    margin: "0 auto"
  }
}));

const Dashboard = ({ answeredQuestions, unansweredQuestions }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        color="default"
        className={classes.tableContainer}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="unanswered questions" {...a11yProps(0)} />
          <Tab label="answered questions" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
        className={classes.tableContainer}
      >
        <Typography
          component={"div"}
          value={value}
          index={0}
          dir={theme.direction}
        >
          {unansweredQuestions.map(ques => {
            return <QuestionDetails isAnswered={false} key={ques} id={ques} />;
          })}
        </Typography>
        <Typography
          component="div"
          value={value}
          index={1}
          dir={theme.direction}
        >
          {answeredQuestions.map(ques => {
            return <QuestionDetails isAnswered={true} key={ques} id={ques} />;
          })}
        </Typography>
      </SwipeableViews>
    </div>
  );
};

const mapStateToProps = ({ questions, users, authedUser }) => {
  const user = users[authedUser.userId];
  const answeredQuestions = Object.keys(user.answers).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );
  return {
    unansweredQuestions: Object.keys(questions)
      .filter(qid => !answeredQuestions.includes(qid))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    answeredQuestions
  };
};

export default connect(mapStateToProps, null)(Dashboard);
