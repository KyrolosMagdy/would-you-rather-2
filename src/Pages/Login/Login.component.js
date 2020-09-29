import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { setAuthedUser } from "../../redux/actions/authedUser";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  rootContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%"
  },
  root: {
    minWidth: 500,
    marginTop: "2rem"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "70%"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  submitButton: {
    backgroundColor: "#2196f3",
    color: "white",
    marginTop: "2rem"
  },
  signinContainer: {
    width: "100%"
  }
}));

const Login = ({ users, setAuthedUser }) => {
  const classes = useStyles();
  const [userId, setUserId] = React.useState("");

  const handleChange = event => {
    event.preventDefault();
    setUserId(event.target.value);
  };

  const handleSubmit = event => {
    if (userId) {
      setAuthedUser(userId);
    } else {
      alert("Please select a user before.");
    }
    event.preventDefault();
  };

  return (
    <div className={classes.rootContainer}>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className={classes.signinContainer}>
              <Typography variant="h5" component="h2">
                SignIn
              </Typography>

              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-helper-label">
                  Select user
                </InputLabel>

                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={userId ? userId : ""}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {Object.keys(users).map(user => {
                    return (
                      <MenuItem key={users[user].id} value={users[user].id}>
                        {users[user].name}
                      </MenuItem>
                    );
                  })}
                </Select>

                <FormHelperText>
                  You need to select one user to be able to play
                </FormHelperText>
              </FormControl>
            </div>
            <Button
              variant="contained"
              className={classes.submitButton}
              disabled={userId === ""}
              type="submit"
              value="Submit"
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  setAuthedUser: userId => dispatch(setAuthedUser(userId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
