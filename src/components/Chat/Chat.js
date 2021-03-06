import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";
import {AttachFile, MoreVert, SearchOutlined} from "@material-ui/icons";
import {Avatar, IconButton} from "@material-ui/core";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import firebase from "firebase";
import db from "../../firebase";
import {useStateValue} from "../../StateProvider";

function Chat(){
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{user}, dispatch] = useStateValue();
  useEffect(()=>{
    if(roomId){
      db.collection('rooms')
        .doc(roomId)
        .onSnapshot(snapshot=>setRoomName
          (snapshot.data().name));

      db.collection('rooms').doc(roomId).
      collection("messages").orderBy("timestamp", "asc")
      .onSnapshot(snapshot=>(
        setMessages(snapshot.docs.map((doc)=>doc.data()))
      ));
    }
  },[roomId])

  useEffect(()=>{
    setSeed(Math.floor(Math.random()*5000));
  }, [roomId]);

  const sendMessage = (e)=> {
    e.preventDefault();
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setInput("");
  }

  return(
    <div className="chat">
      <div className="chat-header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
        <div className="chat-headerInfo">
          <h3>{roomName}</h3>
          <p>Last seen at{" "}
          {
            new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chat-headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat-body">
      {messages.map((message)=>{
        return(
          <p className={`chat-message ${message.name === user.displayName && "chat-receiver"}`}>
            <span className="chat-name">{message.name}</span>
          {message.message}
            <span className="chat-timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
          </p>
        )
      })}
      </div>

      <div className="chat-footer">
        <InsertEmoticonIcon />
        <form>
          <input
            placeholder="Type a message"
            type="text"
            value={input}
            onChange={(e)=>{
              setInput(e.target.value)
            }} />
          <button onClick={sendMessage} type="submit">
            <MicIcon />
          </button>
        </form>

      </div>

    </div>
  );
}

export default Chat;
