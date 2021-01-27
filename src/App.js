import React from 'react';
import { Button, FormControl, InputLabel, Input} from '@material-ui/core';
import './App.css';
import Message from './Message';

function App() {
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const [userName, setUserName] = React.useState('Anonymous');

  // console.log('input',input);
  // console.log('messages',messages);

  React.useEffect(() => {
    
  }, [input]);

  const sendMessage = (event) => {
    event.preventDefault(); //dont refresh page on clicking 'enter'
    setMessages([...messages, input]);
    setInput('');
  };

  return (
    <div className="App">
        <h1>FastMessanger</h1>
        <form>
          <FormControl>
            <InputLabel >Enter a message...</InputLabel>
            <Input value={input} onChange={event => setInput(event.target.value)} />
            <Button variant="contained" color="primary" disabled={!input} type='submit' onClick={sendMessage}>Send Message</Button>
          </FormControl>
        </form>
      {
        messages.map((message,id) => (
          <Message key={id} text={message} />
        ))
      }

    </div>
  );
}

export default App;
