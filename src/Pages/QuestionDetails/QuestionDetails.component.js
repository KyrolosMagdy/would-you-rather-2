import React from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

import { withRouter, Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 275,
    maxWidth: "50%",
    margin: "3rem"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  submitButton: {
    margin: "1rem",
    backgroundColor: "#2196f3",
    color: "white",
    width: "6rem"
  },
  answer: {
    color: "#2196f3"
  },
  avatar: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1)
    },
    alignItems: "center"
  },
  wouldQuest: {
    margin: "1rem"
  },
  options: {
    marginLeft: "1rem"
  },
  linkContainer: {
    textDecoration: "none",
    color: "black"
  }
}));

const QuestionDetails = ({
  question,
  questionAuthor,
  answer,
  total,
  percOne,
  percTwo,
  authedUser,
  isAnswered,
  id,
  match
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <div>
          {isAnswered ? (
            <div>
              <div className={classes.avatar}>
                <Avatar
                  alt={questionAuthor.name}
                  src={questionAuthor.avatarURL}
                />
                <Typography component="small">
                  {" "}
                  {questionAuthor.name}{" "}
                </Typography>
              </div>
              <Typography variant="body2" component="p">
                Would You Rather ...?
              </Typography>
              <Typography variant="h5" component="h2">
                {answer === "optionOne" ? (
                  <div>
                    <Typography component="h2" className={classes.answer}>
                      {" "}
                      {question.optionOne.text}{" "}
                    </Typography>
                    <Typography component="h2">
                      {" "}
                      {question.optionTwo.text}
                    </Typography>
                  </div>
                ) : (
                  <div>
                    <Typography component="h2">
                      {" "}
                      {question.optionOne.text}{" "}
                    </Typography>
                    <Typography component="h2" className={classes.answer}>
                      {" "}
                      {question.optionTwo.text}
                    </Typography>
                  </div>
                )}
              </Typography>
              <Typography component="h1">
                {" "}
                Total number of votes: {total}
              </Typography>
            </div>
          ) : (
            <Link
              to={`/questions/${question.id}`}
              className={classes.linkContainer}
            >
              <div className={classes.avatar}>
                <Avatar
                  alt={questionAuthor.name}
                  src={questionAuthor.avatarURL}
                />
                <Typography component="small">
                  {" "}
                  {questionAuthor.name}{" "}
                </Typography>
              </div>
              <Typography component="h2" className={classes.wouldQuest}>
                Would you rather ...?
              </Typography>
              <div className={classes.options}>
                <Typography component="h2">
                  {" "}
                  {question.optionOne.text}{" "}
                </Typography>
                <Typography component="h2">
                  {" "}
                  {question.optionTwo.text}
                </Typography>
              </div>
            </Link>
          )}
        </div>
      </CardContent>
      {isAnswered && (
        <div className="progress">
          <div
            className="progress-one"
            style={{ width: `${percOne}%` }}
          >{`${percOne}%`}</div>
          <div
            className="progress-two"
            style={{ width: `${percTwo}%` }}
          >{`${percTwo}%`}</div>
        </div>
      )}
    </Card>
  );
};

function financial(x) {
  return Number.parseFloat(x).toFixed(2);
}

const mapStateToProps = ({ questions, users, authedUser }, { id }) => {
  const answers = users[authedUser.userId].answers;
  let answer, percOne, percTwo, total;
  const question = questions[id];
  if (answers.hasOwnProperty(question.id)) {
    answer = answers[question.id];
  }
  const questionAuthor = users[question.author];
  total = question.optionOne.votes.length + question.optionTwo.votes.length;
  percOne = financial((question.optionOne.votes.length / total) * 100);
  percTwo = financial((question.optionTwo.votes.length / total) * 100);
  return {
    question,
    questionAuthor,
    answer,
    total,
    percOne,
    percTwo,
    authedUser
  };
};

export default withRouter(connect(mapStateToProps)(QuestionDetails));
