import  { useState } from 'react';
import axios from 'axios';

const ChatInput = () => {
  const [message, setMessage] = useState('');

  const handleMessageSubmit = async () => {
    try {
        const info = localStorage.getItem("userInfo")
        const userInfo = JSON.parse(info); 
        console.log(userInfo);
        const token = userInfo.token
        console.log(token);

      const response = await axios.post('http://localhost:3000/api/chat',{
         
        message: message,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }});
      console.log('Message sent:', response.data);
      // Clear the message input field after sending
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '10px' }}>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={handleMessageSubmit}>Send</button>
    </div>
  );
};

export default ChatInput;
