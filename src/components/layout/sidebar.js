import { Box, Code, Button, Stack } from "@chakra-ui/react";
import { USERS } from "../../lib/routes";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import Avatar from "../profile/Avatar";
import Buttons from "./LinkButtons";
import LinkButtons from "./LinkButtons";

function ActiveUser() {
  const { user, isLoading } = useAuth();

  if (isLoading) return "Loading...";

  if (!user) {
    return (
      <Stack align="center" spacing="5" my="5">
        <Avatar user={user} />
        <Code>@User</Code>
        {/* <Button
          colorScheme="teal"
          w="full"
          as={Link}
          to={`$/profile/${user.id}`}
        >
          Edit Profile
        </Button> */}
      </Stack>
    );
  }

  return (
    <Stack align="center" spacing="5" my="5">
      <Avatar user={user} />
      <Code>@{user.username}</Code>
      <Button colorScheme="teal" w="full" as={Link} to={`/profile/${user.id}`}>
        Edit Profile
      </Button>
    </Stack>
  );
}

export default function Sidebar() {
  return (
    <Box
      px="6"
      height="100vh"
      w="100%"
      maxW="300px"
      borderLeft="1px solid"
      borderLeftColor="teal.100"
      position="sticky"
      top="16"
      display={{ base: "none", md: "block" }}
    >
      <ActiveUser />
      <Box align="center">
        <Box as="ul" borderBottom="2px solid" borderColor="teal.200" />
        <Button
          variant="outline"
          colorScheme="teal"
          as={Link}
          to={USERS}
          mt="4"
          size="sm"
        >
          All Users
        </Button>
        <LinkButtons />
      </Box>
    </Box>
  );
}
