import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button, Flex, Box, Text, Heading } from "@chakra-ui/react";

function Profile({ history }) {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    logout(() => {
      //anasayfaya yönlendirme parametresi
      history.push("/");
    });
  };

  // console.log("profile page user info", user);

  return (
    <Flex
      flexDirection="column"
      mt="3rem"
      align="center"
      width="full"
      gridGap="1rem"
      justifyContent="center"
    >
      <Box textAlign="center">
        <Heading>My Profile</Heading>
      </Box>
      <Box
        border="1px solid black"
        borderRadius="2rem"
        padding="2rem"
        display="flex"
        flexDirection="column"
        gridGap="1rem"
      >
        <Text fontSize="1.1rem">My E-mail: {user.email}</Text>
        <Text fontSize="1.1rem">My Password: {user.password}</Text>
        <Button colorScheme="pink" variant="solid" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      <Link to="/">
        <Button colorScheme="orange">Start Shopping</Button>
      </Link>
    </Flex>
  );
}

export default Profile;
