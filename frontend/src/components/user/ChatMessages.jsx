import  { useState, useEffect } from 'react';
import axios from 'axios';

const ChatMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/chat');
        console.log('Messages retrieved:', response.data);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div style={{ marginTop: '20px', textAlign: 'center' }}>
      <h2>Messages</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChatMessages;
