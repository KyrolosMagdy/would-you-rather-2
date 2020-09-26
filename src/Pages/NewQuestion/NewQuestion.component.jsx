import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { handleAddQuestion } from "../../redux/actions/shared";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  },
  inputFields: {
    width: "70%",
    marginLeft: "1rem"
  }
}));

const NewQuestion = ({ handleAddQuestion, history }) => {
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const classes = useStyles();

  const handleInputChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case "option1":
        return setOption1(value);
      case "option2":
        return setOption2(value);
      default:
        return;
    }
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    if (option1.length > 1 && option2.length > 1) {
      handleAddQuestion(option1, option2)
        .then(res => {
          setOption1("");
          setOption2("");
        })
        .then(res => {
          history.push("/");
        });
    } else {
      console.log("Err, please fill in the inputs");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography
        component="div"
        style={{
          border: "2px solid #2196f3",
          color: "#2196f3",
          height: "30vh",
          marginTop: "9rem"
        }}
      >
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleFormSubmit}
        >
          <TextField
            id="outlined-basic"
            label="Option One"
            variant="outlined"
            className={classes.inputFields}
            name="option1"
            value={option1}
            onChange={handleInputChange}
          />
          <TextField
            id="outlined-basic"
            label="Option Two"
            variant="outlined"
            className={classes.inputFields}
            name="option2"
            value={option2}
            onChange={handleInputChange}
          />
          <Button
            variant="contained"
            value="submit"
            type="submit"
            style={{
              backgroundColor: "#2196f3",
              color: "white",
              marginLeft: "1rem",
              marginBottom: "9rem",
              padding: "5px"
            }}
          >
            Submit
          </Button>
        </form>
      </Typography>
    </Container>
  );
};

const mapDispatchToProps = dispatch => ({
  handleAddQuestion: (option1, option2) =>
    dispatch(handleAddQuestion(option1, option2))
});

export default withRouter(connect(null, mapDispatchToProps)(NewQuestion));
