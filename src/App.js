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

import db from "./firebase";
import firebase from "firebase";

function App() {
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState([]); // Messages
  const [username, setUsername] = React.useState("");
  const [roomName, setRoomName] = React.useState([]);
  // console.log('input',input);
  // console.log('messages',messages);
  console.log(username);

  //adding to db
  React.useEffect(() => {
    // run once when the app component loads
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  const drawerWidth = 240;
  //styles by MUI
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

  //adding to db
  // React.useEffect(() => {
  //   // run once when the app component loads
  //   db.collection("")
  //     .orderBy("timestamp", "desc")
  //     .onSnapshot((snapshot) => {
  //       setRoomName(
  //         snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
  //       );
  //     });
  // }, []);

  React.useEffect(() => {
    setUsername(prompt("Enter your nickname"));
  }, []);

  const sendMessage = (event) => {
    event.preventDefault(); //dont refresh page on clicking 'enter'

    db.collection("messages").add({
      data: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // setMessages([...messages, {username: username, text: input}]);
    setInput("");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            FastMessenger
          </Typography>
          <Header username={username} />
        </Toolbar>
      </AppBar>
      <div className="Menu">
        <RoomMenu roomName={roomName} />
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
