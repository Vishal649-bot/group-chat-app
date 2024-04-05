import { Box } from "@chakra-ui/layout";
// import { ChatState } from "../Context/ChatProvider";
import ChatWindow from "../components/user/ChatWindow";
// import MyChats from "../components/MyChats";
// import Chatbox from "../components/Chatbox";

const ChatPage = () => {
  // const { user } = ChatState();
  
  return (
<div style={{ width: "100%" }}>
      {/* {user && <SideDrawer />} */}
      <ChatWindow/>
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {/* {user && <MyChats />}
         {user && (
          <Chatbox />
        )}  */}
      </Box>
    </div>
  )
}

export default ChatPage
