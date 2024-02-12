import React, { useEffect, useState } from 'react';
import { FormControl, Container, TextField, Typography } from '@mui/material';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { uid } from 'uid';
import { ref, onValue, set } from 'firebase/database';
import { useNavigate, useParams } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from 'firebase/auth';
import { auth, db } from './firebase';
import Todo from './Todo';
import Success from './Success';

function AddTodo() {
  // Get name of user
  const name = useParams();
  const myName = name.curr.split('@');

  const navigate = useNavigate();
  let newArr = [{}];
  const newObj = {
    title: null,
    status: null,
    timeTaken: null,
    createdAt: null,
    done: null,
    userId: null,
  };
  const [text, setText] = useState('');
  const [openalert, setOpenalert] = useState(false);
  const [completed, setCompleted] = useState('');
  const [dbtodo, setDbtodo] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setDbtodo([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((dbtodo) => {
              setDbtodo((oldArray) => [...oldArray, dbtodo]);
            });
          }
        });
      } else if (!user) {
        navigate('/');
      }
    });
  }, []);

  // Date
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();

  today = `${mm}/${dd}/${yyyy}`;

  const date = new Date(today);
  const day = date.toLocaleString('en-us', { weekday: 'long' });

  // create a new todo
  const handleChange = (e) => {
    setText(e.target.value);
  };

  const createTodo = (e) => {
    e.preventDefault();
    // new object creation
    newObj.title = text;
    newObj.status = 'new';
    newObj.timeTaken = '00:00:00';
    newObj.createdAt = today;
    newObj.done = false;

    // add to firebase db
    if (text !== '') {
      setText('');
      const uidd = uid();
      newObj.userId = uidd;
      set(ref(db, `/${auth.currentUser.uid}/${uidd}`), newObj);
      setOpenalert(false);
    } else {
      setOpenalert(true);
    }
  };

  // delete a todo
  const setRemove = (item) => {
    newArr = [...dbtodo].filter((todo) => todo !== item);
    setDbtodo(newArr);
  };

  // complete a todo
  const setComplete = (c) => {
    setCompleted(completed, c);
  };

  // signout
  async function handleLogout() {
    try {
      console.log('in signout');
      await signOut(auth);
      navigate('../', { replace: true });
    } catch {
      alert('Error!');
    }
  }

  return (
    <div>
      <Container
        maxWidth="sm"
        style={{ marginTop: '50px', backgroundColor: 'white', padding: '10px' }}
      >
        <IconButton
          edge="end"
          aria-label="add"
          color="primary"
          size="extra-large"
          onClick={handleLogout}
          style={{
            marginTop: '10px',
            alignItems: 'right',
            justifyContent: 'right',
            marginLeft: '90%',
          }}
        >
          <LogoutIcon />
        </IconButton>

        <form>
          <Typography
            variant="h4"
            component="h2"
            style={{ padding: '10px', fontFamily: 'sans-serif' }}
          >
            Welcome {myName[0].toUpperCase()}
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            style={{ padding: '10px', color: 'blue', fontFamily: 'sans-serif' }}
          >
            {day}
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            style={{ padding: '10px', color: 'blue', fontFamily: 'sans-serif' }}
          >
            {today}
          </Typography>
          <FormControl
            fullWidth
            style={{
              display: 'inline',
              alignItems: 'right',
              justifyContent: 'right',
              marginTop: '20px',
            }}
          >
            <TextField
              style={{ width: '90%', padding: '5px' }}
              id="outlined-basic"
              label="Enter the Task"
              variant="outlined"
              onChange={handleChange}
              required
              value={text}
            />

            <IconButton
              edge="end"
              aria-label="add"
              color="primary"
              size="extra-large"
              onClick={createTodo}
              style={{ marginTop: '10px' }}
            >
              <AddCircleIcon />
            </IconButton>
          </FormControl>
        </form>
      </Container>
      {dbtodo.length > 0 ? (
        <List
          sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}
          style={{ marginLeft: 'auto', marginRight: 'auto' }}
        >
          {dbtodo
            .filter((todo, index) => !todo.done)
            .map((todo, index) => (
              <Todo
                todoNo={index}
                todo={todo}
                key={index}
                setRemove={setRemove}
                setComplete={setComplete}
              />
            ))}

          {dbtodo
            .filter((todo, index) => todo.done)
            .map((todo, index) => (
              <Todo
                todoNo={index}
                todo={todo}
                key={index}
                setRemove={setRemove}
                setComplete={setComplete}
              />
            ))}
        </List>
      ) : (
        <Container
          maxWidth="sm"
          style={{ backgroundColor: 'white', padding: '10px' }}
        >
          <Typography
            style={{
              textAlign: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            No Tasks Added Yet!!!!!
          </Typography>
        </Container>
      )}

      {openalert ? (
        <Success message="Please enter a Task!!!!" status="error" />
      ) : (
        ''
      )}
    </div>
  );
}

export default AddTodo;
