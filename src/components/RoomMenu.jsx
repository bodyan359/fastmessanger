import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import AddIcon from "@material-ui/icons/Add";

import db from "../firebase";

const RoomMenu = React.forwardRef(({ roomName, username }, ref) => {
  // eslint-disable-next-line no-unused-vars
  const [messages, setMessages] = React.useState([]);

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

  const createRoom = (event) => {
    let text = prompt("Please enter room name:", "PJATK Students");

    db.collection("rooms").add({
      id: username,
      name: text,
    });
  };

  const openRoom = (roomID) => {
    localStorage.setItem("roomID", roomID);
    roomID &&
      db
        .collection("rooms")
        .doc(roomID)
        .collection("messages")
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
          );
        });
  };

  const classes = useStyles();

  return (
    <Drawer
      ref={ref}
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <Divider />

      <List>
        <ListItem button onClick={createRoom}>
          <ListItemText primary="Create new room" />
          <AddIcon />
        </ListItem>
        <Divider />
        {roomName.map(({ id, name }) => (
          <ListItem button key={id} onClick={() => openRoom(id)}>
            <ListItemText primary={name.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
});

export default RoomMenu;
