import React from "react";
import {
  Box,
  Container,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Login from '../components/Authentication/Login'
import Signup from '../components/Authentication/Signup'

const HomePage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
         p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Flex justifyContent="center">
          <Text fontSize="4xl" fontFamily="Work sans">
           Group Chat App
          </Text>
        </Flex>
      </Box>

      {/* tabs */}
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
    <Tabs isFitted variant="soft-rounded">
      <TabList mb="1em">
        <Tab>Login</Tab>
        <Tab>Sign Up</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Login />
        </TabPanel>
        <TabPanel>
          <Signup />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </Box>
    </Container>
  );
};

export default HomePage;
