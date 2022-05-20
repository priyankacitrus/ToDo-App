import React, { useRef, useState } from "react";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { ListItemIcon, Checkbox } from "@mui/material";
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import Success from "./Success";
import moment from "moment";
import { Fade } from "@mui/material";
import {auth} from "./firebase";
import {db} from "./firebase.js";
import { DeleteOutline } from "@mui/icons-material";
import {ref, remove, update} from "firebase/database"

const Todo = ({ todo, setRemove, setComplete }) => {
  //timer states
  var [active, setActive] = useState(false);
  var [pause, setPause] = useState(false);
  var [time, setTime] = useState(0);
  var [view, setView] = useState(true);
  const interval = useRef(null);


//alert states
  var [openalert, setOpenalert] = useState(false);
  var [deletealert, setDeletealert] = useState(false);
  
  //checkbox states
  var [check, setCheck] = useState(false);

  //db reference
  //const todoref = ref(db,"/Todo/"+todo.id);

console.log("ID",todo.userId);
  //checkbox checking
  const change = () => {
    setCheck(!check);
    if (todo.status === "completed") {
      setOpenalert(openalert = false);
      setComplete(false);
      setTime(moment.duration(todo.timeTaken).asSeconds());
      update(ref(db, `/${auth.currentUser.uid}/${todo.userId}`), {
        status: "pending",
        done: "false",
      });
    }
    else {
      setOpenalert(openalert = true);
      setComplete(true);
      update(ref(db, `/${auth.currentUser.uid}/${todo.userId}`), {
        status: "completed",
        done: "true",
        timeTaken: moment.utc(time * 1000).format('HH:mm:ss')
      });
      setTime(0);
      ;
    }
  }

  //pause button action
  const paused = () => {
    setPause(pause = true);
    setActive(active = false);
    timer("pause");
    secondsToHms();
    update(ref(db, `/${auth.currentUser.uid}/${todo.userId}`), {
      status: "pending",
    });
  }

  //stop button action
  const stop = () => {
    setPause(pause = false);
    setActive(active = false);
    setView(true);
    setCheck(true);
    timer("stop");
    setTime(0);
    secondsToHms();
    setOpenalert(openalert = true);
    setComplete(true);
    update(ref(db, `/${auth.currentUser.uid}/${todo.userId}`), {
      status: "completed",
      done: "true",
      timeTaken: moment.utc(time * 1000).format('HH:mm:ss')
    });
  }

  //time convert function
  function secondsToHms() {
    todo.timeTaken = moment.utc(time * 1000).format('HH:mm:ss');
  }

  //play button action
  const play = () => {
    setView(false);
    setPause(pause = false);
    setActive(active = true);
    timer("play");
    setTime(moment.duration(todo.timeTaken).asSeconds());
    update(ref(db, `/${auth.currentUser.uid}/${todo.userId}`), {
      status: "pending",
    });
  }

  //Timer start function
  const timer = (status) => {

    if (status === "play") {
      interval.current = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    }
    else if (status === "pause") {
      clearInterval(interval.current);
      setTime(time);
    }
    else {
      clearInterval(interval.current);
    }

  }


  //delete icon action
  const removetodo = () => {
    const uid=todo.uid;
    setDeletealert(false);
    remove(ref(db, `/${auth.currentUser.uid}/${todo.userId}`));
    setDeletealert(deletealert=true);
    setRemove(todo);

  }

  return (

    <Fade in={true} timeout={200}>
      <div>
        <ListItem>
          <ListItemIcon>
            <Checkbox
              style={{ color: "green" }}
              edge="start"
              disableRipple
              checked={todo.status === "completed" ? true : false}
              onClick={change}
            />

          </ListItemIcon>
          <ListItemText primary={todo.title} style={{ textDecoration: todo.status === "completed" ? "line-through" : "none", color: todo.status === "completed" ? "red" : "black" }} />
          <ListItemText secondary={todo.timeTaken} style={{ color: "blue", visibility: todo.done ? "visible" : "hidden" }} />

          <ListItemIcon >
            <IconButton edge="end" aria-label="stop" style={{ color: "red", visibility: todo.status === "completed" || view ? "hidden" : "visible" }} onClick={stop}>
              <StopCircleIcon />
            </IconButton>
          </ListItemIcon>

          <ListItemIcon >
            {active ?

              <IconButton edge="end" aria-label="pause" style={{ color: "blue", visibility: todo.status === "completed" || view || pause ? "hidden" : "visible" }} onClick={paused}>
                <PauseCircleOutlineIcon />
              </IconButton>

              :

              <IconButton edge="end" aria-label="play" style={{ color: "blue", visibility: todo.status === "completed" ? "hidden" : "visible" }} onClick={play}>
                <PlayCircleFilledIcon />
              </IconButton>

            }
          </ListItemIcon>

          <ListItemIcon style={{ visibility: todo.status === "completed" ? "hidden" : "visible" }}>
            {moment.utc(time * 1000).format('HH:mm:ss')}
          </ListItemIcon>

          <ListItemIcon onClick={removetodo}>
            <IconButton edge="end" aria-label="delete" style={{ color: "black" }}>
              <DeleteOutline />
            </IconButton>
          </ListItemIcon>

        </ListItem>
        {
          openalert ? <Success message="Congrats!!!Task Completed." status="success" /> : ""
        }
        {
          deletealert ? <Success message="Task Deleted!!!" status="success" /> : ""
        }
      </div>
    </Fade>
  );
};

export default Todo;