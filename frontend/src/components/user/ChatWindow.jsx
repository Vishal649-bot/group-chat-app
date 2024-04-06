import { useState, useEffect } from "react";
import axios from "axios";
import { useDisclosure, Button } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
} from "@chakra-ui/react";
import GroupList from "../group/GropuList";

const ChatWindow = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState(""); // State for group name
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const info = localStorage.getItem("userInfo");
        const userInfo = JSON.parse(info);
        const token = userInfo.token;

        const response = await axios.get("http://localhost:3000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const toggleUserSelection = (userId, userName) => {
    const selectedIndex = selectedUsers.findIndex(
      (user) => user.id === userId
    );
    if (selectedIndex !== -1) {
      setSelectedUsers((prevUsers) => {
        const updatedUsers = [...prevUsers];
        updatedUsers.splice(selectedIndex, 1);
        return updatedUsers;
      });
    } else {
      setSelectedUsers((prevUsers) => [
        ...prevUsers,
        { id: userId, name: userName },
      ]);
    }
  };

  const createGroup = async () => {
    try {
      const info = localStorage.getItem("userInfo");
      const userInfo = JSON.parse(info);
      const token = userInfo.token;

      // Send group name along with selected users
      await axios.post(
        "http://localhost:3000/api/group",
        {
          groupName, // Add group name here
          users: selectedUsers.map((user) => ({
            id: user.id,
            name: user.name,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Optionally, you can reset the selected users and group name after creating the group
      setSelectedUsers([]);
      setGroupName("");
      onClose();
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  return (
    <div>
      {users.length === 0 ? (
        <p>No users logged in.</p>
      ) : (
        <div>
          <h2>Logged-in Users:</h2>
          <Button onClick={onOpen}>Create Group</Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Input
                  placeholder="Enter Group Name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
                <ul>
                  {users.map((user) => (
                    <li
                      key={user.id}
                      onClick={() =>
                        toggleUserSelection(user.id, user.name)
                      }
                      style={{
                        cursor: "pointer",
                        backgroundColor: selectedUsers.some(
                          (selectedUser) => selectedUser.id === user.id
                        )
                          ? "lightblue"
                          : "inherit",
                      }}
                    >
                      <img
                        src={user.pic}
                        alt={user.name}
                        style={{ width: "100px", height: "100px" }}
                      />
                      <span>{user.name}</span>
                    </li>
                  ))}
                </ul>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={createGroup}>
                  Create
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <GroupList/>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
