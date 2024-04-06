import { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    
  } from "@chakra-ui/react";
import { useDisclosure, Button } from "@chakra-ui/react";
import axios from 'axios'



const ChangeAdmin = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedUserId, setSelectedUserId] = useState(null);
    const groupId = props.groupId; // Accessing the groupId prop
    const handleUserClick = (userId) => {
        console.log(userId);
      setSelectedUserId(userId);
    };
  
    const handleSave = async () => {
      try {
        const info = localStorage.getItem("userInfo");
        const userInfo = JSON.parse(info);
        const token = userInfo.token;
  
        // Send the selected user ID to the API endpoint
        await axios.post(
          "http://localhost:3000/api/group/changeAdmin",
          {
            userId: selectedUserId,
            groupId: groupId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        // Close the modal after saving
        onClose();
      } catch (error) {
        console.error("Error saving admin:", error);
      }
    };
  
    return (
      <>
        <Button onClick={onOpen}>Change Admin</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Change Admin</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <h3>Select New Admin:</h3>
              <ul>
                {props.data.users.map((user) => (
                  <li key={user.id}>
                    <Button onClick={() => handleUserClick(user.id)}>
                      {user.name}
                    </Button>
                  </li>
                ))}
              </ul>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSave}>
                Save
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default ChangeAdmin;