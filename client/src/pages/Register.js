import { makeStyles, useTheme } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { registerUser,checkRegister } from '../redux/auth/authSlice';
import {
  Grid,
  Card,
  Typography,
  List,
  ListItem,
  Button,
} from "@material-ui/core";
import smart from '../assets/img/smart.jpg'
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "#e6e0e0",
    height: "100vh",
  },
  text20: {
    fontFamily: "Poppins",
    fontWeight: "normal",
    fontSize: "20px",
    lineHeight: "30px",
    letterSpacing: "0.01rem",
    color: "#192A3E",
    fontWeight: 600,
    marginBottom: "16px",
  },
  text13: {
    fontFamily: "Poppins",
    fontWeight: "normal",
    fontSize: "13px",
    lineHeight: "19px",
    letterSpacing: "0.01rem",
    color: "#FFF",
    fontWeight: 600,
  },
  input: {
    width: "400px",
    height: "48px",
    borderRadius: "8px",
    marginBottom: "12px",
    outline: "none",
    padding: "16px 12px",
    border:"1px solid #55ca1e",
    boxShadow:"4px 4px 1px rgba(36,37,94,0.1) ",
  },
  label: {
    marginBottom: "16px",
    fontFamily: "DM Sans",
    fontWeight: 500,
    fontSize: "18px",
    lineHeight: "24px",
    color: "#404D61",
  },
  button: {
    width: "155px",
    height: "40px",
  },
}));

export default function Register() {
  const classes = useStyles();
  const theme = useTheme();
  
  const dispatch = useDispatch();
  const { isAuthenticated,errorRegister } = useSelector((state) => state.auth);
   
  const [errorpass,setError]=useState("");
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    repassword:'',
  });

  const { username, email, password, repassword } = formData;
  const onChange = (e) => setFormData(
   { ...formData, [e.target.name]: e.target.value }
    );
  const handleSubmit = (e) => {
    e.preventDefault();
    // if(password!==repassword){ 
    //   setError("Not correct password!! Please try again." );
    // }
   
      dispatch(checkRegister({username, email, password}))
      dispatch(registerUser({ username, email, password}));
      if(password!==repassword){ 
        setError("Not correct password!! Please try again." );
      }
  };

  if (isAuthenticated) {
    return <Redirect to="/control" />;
  }

  return (
    <Grid container direction="row" spacing={0} className={classes.root}>
      <Grid item xs={7}>
        <img
          src={smart}
          style={{ height: "100%", width: "100%" }}
        ></img>
      </Grid>
      <Grid
        item
        xs={5}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card style={{ padding: "35px 47px", height: "620px", width: "488px" }}>
          <Typography className={classes.text20}>
            Let's become one of us{" "}
          </Typography>

          <form>
            <label className={classes.label}>Username</label>
            <br></br>
            <input type="text" className={classes.input} name="username" placeholder = "Username" onChange={onChange}></input>
            <p className="fst-italic text-danger">{errorRegister.userError}</p>
            <label className={classes.label}>Email</label>
            <br></br>
            <input type="email" className={classes.input} name="email" placeholder = "Email" onChange={onChange}></input>
            <p className="fst-italic text-danger">{errorRegister.emailError}</p>
            <label className={classes.label}>Password</label>
            <br></br>
            <input type="password" className={classes.input} name="password" placeholder = "Password" onChange={onChange}></input>
            <p className="fst-italic text-danger">{errorRegister.passError}</p>
            <label className={classes.label}>Confirm Password</label>
            <br></br>
            <input type="password" className={classes.input} name="repassword" placeholder = "Repassword" onChange={onChange}></input>
            <p className="fst-italic text-danger">{errorpass}</p>
          </form>
          <List>
            <ListItem>
              <Button variant="contained" style={{backgroundColor:"#5eac3c"}} onClick={handleSubmit}>
                Sign up
              </Button>
              <Button
                variant="contained"
                style={{ marginLeft: "auto",backgroundColor:"#5eac3c" }}
              >
                <Link to="/login">Sign In</Link>
              </Button>
            </ListItem>
          </List>
        </Card>
      </Grid>
    </Grid>
  );
}