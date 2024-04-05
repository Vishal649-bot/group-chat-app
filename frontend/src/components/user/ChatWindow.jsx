// ChatWindow.js
import  { useState, useEffect } from 'react';
import axios from 'axios';

const ChatWindow = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from backend
    const fetchUsers = async () => {
      try {
        const info = localStorage.getItem("userInfo")
        const userInfo = JSON.parse(info); 
        console.log(userInfo);
        const token = userInfo.token
        console.log(token);

        const response = await axios.get('http://localhost:3000/api/user',  {
          headers: {
            Authorization: `Bearer ${token}`
          }});
        console.log(response);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      {users.length === 0 ? (
        <p>No users logged in.</p>
      ) : (
        <div>
          <h2>Logged-in Users:</h2>
          <ul>
            {users.map(user => (
              <li key={user.id}>
                <img src={user.pic} alt={user.name} style={{ width: '100px', height: '100px' }} />
                <span>{user.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
