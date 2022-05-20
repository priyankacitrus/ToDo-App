import React, { useState } from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {auth} from "./firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";


const Signup = () => {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");
  var [emailerrormsg, setEmailerrormsg] = useState("");
  var [passerrormsg, setPasserrormsg] = useState("");
  var [cpasserrormsg, setCpasserrormsg] = useState("");

  console.log(email, pass);
 // const [loading, setLoading] = useState(false);

  //register new user
  async function handleSignup() {
    try{
      await  createUserWithEmailAndPassword(auth, email, pass);
      alert("Successfully Registered");
      navigate("../", { replace: true });
    }
    catch(e){
      alert("User Already exists!!!")
    }
  }


  //signup button click
  function handleClick(e) {

    e.preventDefault();
    setEmailerrormsg("");
    setPasserrormsg("");
    setCpasserrormsg("");
    if (email === "")
      setEmailerrormsg("Email is Required");
    if (pass === "")
      setPasserrormsg("Password is Required");
    if (cpass === "")
      setCpasserrormsg("Confirm Password is Required");
    if (pass !== cpass)
      setCpasserrormsg("Password and Confirm Password must be same");
    if((emailerrormsg.length>0) || (passerrormsg.length>0) || (cpasserrormsg.length>0))
    handleSignup();

  }
  return (
    <Grid>
      <Paper elevation={20} style={{ padding: '30px 20px', width: 300, margin: "20px auto" }}>
        <Grid align='center'>
          <Avatar style={{ backgroundColor: '#1bbd7e' }}>
            <AddCircleOutlineIcon />
          </Avatar>
          <h2 style={{ margin: 0 }}>Sign Up</h2>
          <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
        </Grid>
        <form style={{ marginTop: "20px" }}>
          <TextField fullWidth label='Email'
            error={emailerrormsg.length > 0 ? true : false}
            helperText={emailerrormsg}
            placeholder="Enter your email" style={{ marginBottom: "10px" }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField fullWidth label='Password'
            type="password"
            error={passerrormsg.length > 0 ? true : false}
            helperText={passerrormsg}
            placeholder="Enter your password" style={{ marginBottom: "10px" }}
            onChange={(e) => setPass(e.target.value)}
          />
          <TextField fullWidth label='Confirm Password'
            type="password"
            error={cpasserrormsg.length > 0 ? true : false}
            helperText={cpasserrormsg}
            placeholder="Confirm your password" style={{ marginBottom: "10px" }}
            onChange={(e) => setCpass(e.target.value)}
          />
          <Button type='submit' variant='contained' color='primary' style={{ margin: '8px 0' }} fullWidth
            onClick={handleClick}
          >
            Sign up</Button>
            <Button type='submit' variant='contained' color='primary' style={{ margin: '8px 0' }} fullWidth
            onClick={() => navigate("../", { replace: true })}
          >
            Cancel</Button>
        </form>
      </Paper>
    </Grid>
  )
}

export default Signup; 