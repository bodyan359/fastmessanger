import React from "react";

import "./App.css";
import Message from "./Message";

import { FormControl, InputLabel, Input, IconButton } from "@material-ui/core";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";

import db from "./firebase";
import firebase from "firebase";

function App() {
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const [username, setUsername] = React.useState("");

  // console.log('input',input);
  // console.log('messages',messages);

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
    <div className="App">
      <img alt="logo" src="https://web.telegram.org/img/logo_share.png" />
      <h1>FastMessenger</h1>
      <h2>Welcome {username || "Anonymous"f}</h2>
      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>
      <form className="app__form">
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
    </div>
  );
}

export default App;
