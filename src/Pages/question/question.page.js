import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import { handleAnswer } from "../../redux/actions/shared";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles({
  formContainer: {
    display: "flex",
    justifyContent: "center",
    margin: "5rem auto",
    padding: "2rem",
    maxWidth: "20rem",
    border: "5px solid #2196f3",
    borderRadius: "1rem"
  },
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

const Question = ({ question, match, handleAnswer, history }) => {
  const handleChange = event => {
    setValue(event.target.value);
  };

  const classes = useStyles();

  const [value, setValue] = useState("optionOne");

  const handleFormSubmit = e => {
    e.preventDefault();
    const { questionId } = match.params;
    handleAnswer(questionId, value);
    history.push("/");
  };

  return (
    <form className={classes.formContainer} onSubmit={handleFormSubmit}>
      <FormControl>
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
          className={classes.submitButton}
          type="submit"
          value="Submit"
        >
          Submit
        </Button>
      </FormControl>
    </form>
  );
};

const mapStateToProps = ({ questions, users, authedUser }, { match }) => {
  const { questionId } = match.params;
  const question = questions[questionId];
  const questionAuthor = users[question.author];
  return {
    question,
    questionAuthor,
    authedUser
  };
};

const mapDispatchToProps = dispatch => ({
  handleAnswer: (qid, answer) => {
    dispatch(handleAnswer(qid, answer));
  }
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Question)
);
