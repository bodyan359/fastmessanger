import React from "react";

import "./App.css";
import { Message, Header, RoomMenu } from "./components";

import { makeStyles } from "@material-ui/core/styles";
import { FormControl, InputLabel, Input, IconButton } from "@material-ui/core";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { fetchWeather } from "./api/Weather";
import db from "./firebase";
import firebase from "firebase";

function App() {
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const [username, setUsername] = React.useState("");
  const [roomNames, setRoomNames] = React.useState([]);
  const [roomID, setRoomID] = React.useState("PjBDnTCDD1IlMLgQsXh6");

  React.useEffect(() => {
    db.collection("rooms")
      .doc(roomID)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, [roomID]);

  React.useEffect(() => {
    db.collection("rooms")
      .orderBy("name", "asc")
      .onSnapshot((snapshot) => {
        setRoomNames(
          snapshot.docs.map((doc) => ({ id: doc.id, name: doc.data() }))
        );
      });
  }, []);

  const drawerWidth = 240;

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  }));
  const classes = useStyles();

  React.useEffect(() => {
    setUsername(prompt("Enter your nickname"));
  }, []);

  const sendMessage = (event) => {
    event.preventDefault(); //dont refresh page on clicking 'enter'

    db.collection("rooms").doc(roomID).collection("messages").add({
      data: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    let inputArray = input.split(" ", 2);
    if (inputArray[0].toLowerCase() === "weather") {
      fetchWeather(inputArray[1]).then((data) => {
        data !== undefined &&
          setTimeout(
            db
              .collection("rooms")
              .doc(roomID)
              .collection("messages")
              .add({
                data: `Weather in ${data?.location?.name} is ${data?.current?.temp_c}°.Local time: ${data?.location?.localtime}. Condition: ${data?.current?.condition?.text}.`,
                username: "Weather Bot",
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              }),
            2220
          );
      });
    }
    setInput("");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className="Header">
          <Typography variant="h6" noWrap>
            FastMessenger
          </Typography>
          <Header username={username} />
        </Toolbar>
      </AppBar>
      <div className="Menu">
        <RoomMenu
          roomNames={roomNames}
          username={username}
          setRoomID={setRoomID}
        />
      </div>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <FlipMove className="messageStyle">
          {messages.map(({ id, message }) => (
            <Message
              className={id}
              key={id}
              username={username}
              message={message}
            />
          ))}
        </FlipMove>
        <form className="app__form container">
          <FormControl className="app__formControl">
            <InputLabel>Enter a message...</InputLabel>
            <Input
              className="app__input"
              placeholder="Enter a message"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <IconButton
              className="app__iconButton"
              variant="contained"
              color="primary"
              disabled={!input}
              type="submit"
              onClick={sendMessage}
            >
              <SendIcon />
            </IconButton>
          </FormControl>
        </form>
      </main>
    </div>
  );
}

export default App;
