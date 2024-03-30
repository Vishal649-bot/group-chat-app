import axios from "axios";
import { useEffect, useState } from "react";

const ChatPage = () => {
    const [chats, setChats] = useState([]);

    const fetchdata = async () => {
      const {data} = await axios.get("http://localhost:3000/api/chat/");
      console.log(data);
      setChats(data)
    };
   
  // console.log(chats);
    useEffect(() => {
      fetchdata();
    
    }, []);
  return (
    <div>
    {chats.map(chat => (
     <div key={chat._id}>{chat.chatName}</div>
   ))}
 </div>
  )
}

export default ChatPage
