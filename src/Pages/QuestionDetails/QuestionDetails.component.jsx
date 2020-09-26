import React, { useState } from "react";
import { connect } from "react-redux";
import { handleAnswer } from "../../redux/actions/shared";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
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
  }
});

const QuestionDetails = ({
  question,
  questionAuthor,
  answer,
  total,
  percOne,
  percTwo,
  authedUser,
  isAnswered,
  handleAnswer,
  id
}) => {
  const handleChange = event => {
    setValue(event.target.value);
  };

  const classes = useStyles();

  const [value, setValue] = useState("optionOne");

  const handleFormSubmit = e => {
    console.log("submitted", value);
    handleAnswer(id, value);
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <div>
          {isAnswered ? (
            <div>
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
            </div>
          ) : (
            <FormControl component="fieldset">
              <FormLabel component="legend"> Would You Rather ...? </FormLabel>
              <RadioGroup
                aria-label="answer"
                name="answer"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="optionOne"
                  control={<Radio />}
                  label={question.optionOne.text}
                />
                <FormControlLabel
                  value="optionTwo"
                  control={<Radio />}
                  label={question.optionTwo.text}
                />
              </RadioGroup>
              <Button
                variant="contained"
                href="#contained-buttons"
                className={classes.submitButton}
                type="submit"
                value="Submit"
                onClick={() => handleFormSubmit()}
              >
                Submit
              </Button>
            </FormControl>
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

function mapDispatchToProps(dispatch, props) {
  const { id } = props;
  return {
    handleAnswer: (qid, answer) => {
      dispatch(handleAnswer(id, answer));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetails);
