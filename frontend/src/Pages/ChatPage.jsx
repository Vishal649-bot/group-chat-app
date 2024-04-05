import { Box } from "@chakra-ui/layout";
// import { ChatState } from "../Context/ChatProvider";
import ChatWindow from "../components/user/ChatWindow";
import ChatInput from "../components/user/ChatInput";


const ChatPage = () => {
  // const { user } = ChatState();
  
  return (
<div style={{ width: "100%" }}>
      <ChatWindow/>
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        <ChatInput/>
      </Box>
    </div>
  )
}

export default ChatPage
