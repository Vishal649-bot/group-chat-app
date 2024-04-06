import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import ChangeAdmin from "../ChangeAdmin";

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/group");
        setGroups(response.data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, []);

  const handleGroupClick = async (groupId) => {
    try {
      const groupResponse = await axios.get(
        `http://localhost:3000/api/group/${groupId}`
      );
      setSelectedGroup(groupResponse.data);

      const messageResponse = await axios.get(
        `http://localhost:3000/api/chat?groupId=${groupId}`
      );
      setMessages(messageResponse.data);
    } catch (error) {
      console.error("Error fetching group details:", error);
    }
  };

  const handleMessageSend = async () => {
    try {
      const info = localStorage.getItem("userInfo");
      const userInfo = JSON.parse(info);
      const token = userInfo.token;

      // Send the message along with the groupId to the /api/chat route
      await axios.post(
        "http://localhost:3000/api/chat",
        {
          groupId: selectedGroup.id,
          message: message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Clear the message input field after sending
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Box display="flex" justifyContent="flex-start">
      <Box flex="1" padding="20px">
        <h2>Group List</h2>
        <ul>
          {groups.map((group) => (
            <li
              key={group.id}
              onClick={() => handleGroupClick(group.id)}
              style={{ cursor: "pointer" }}
            >
              {group.groupName}
            </li>
          ))}
        </ul>
      </Box>
      {selectedGroup && (
        <Box flex="1" padding="20px">

        <ChangeAdmin groupId={selectedGroup.id} data={selectedGroup}/>

          <h3>Selected Group</h3>
          <p>Group Name: {selectedGroup.groupName}</p>
          <p>Users:</p>
          <ul>
            {selectedGroup.users.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
          <h3>Messages</h3>
          <ul>
            {messages.map((msg) => (
              <li key={msg.id}>{msg.message}</li>
            ))}
          </ul>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleMessageSend}>Send Message</button>

        </Box>
        
      )}
      
    </Box>
  );
};

export default GroupList;
