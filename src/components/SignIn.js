import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const currentUser = useAuth();

  // Custom Hook
  function useAuth() {
    const [currentUser, setCurrentUser] = useState();
    useEffect(() => {
      const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
      return unsub;
    }, []);
    console.log(currentUser);
    return currentUser;
  }

  // signin
  async function handleLogin() {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      navigate(`../home/${email}`, { replace: true });
    } catch {
      alert('Invalid username or Password');
    }
  }

  return (
    <div>
      <Grid>
        <Paper
          elevation={10}
          style={{
            padding: 20,
            height: '70vh',
            width: 280,
            margin: '20px auto',
          }}
        >
          <Grid align="center" style={{ marginTop: '20px' }}>
            <Avatar style={{ backgroundColor: 'red' }}>
              <LockIcon />
            </Avatar>
            <h2>Sign In</h2>
          </Grid>
          <TextField
            label="Email"
            placeholder="Enter email"
            fullWidth
            required
            style={{ marginBottom: '20px' }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
            style={{ marginBottom: '20px' }}
            onChange={(e) => setPass(e.target.value)}
          />
          <Button
            type="submit"
            color="primary"
            onClick={handleLogin}
            variant="contained"
            style={{ margin: '8px 0' }}
            fullWidth
          >
            Sign in
          </Button>
          <Typography style={{ marginTop: '20px' }}>
            {' '}
            Don't have an account ?
            <Button onClick={() => navigate('../signup', { replace: true })}>
              Sign Up
            </Button>
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
}

export default SignIn;
