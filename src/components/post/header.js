import { Text, Button, Box, Flex } from "@chakra-ui/react";
import { useUser } from "../../hooks/users";
import Avatar from "../profile/Avatar";
import { formatDistanceToNow } from "date-fns";
import UsernameButton from "../profile/usernameButton";
import { Badge } from "@chakra-ui/react";

export default function Header({ post }) {
  const { subject, uid, date } = post;
  const { user, isLoading } = useUser(uid);

  if (isLoading) return "Loading...";

  return (
    <Flex
      alignItems="center"
      borderBottom="2px solid"
      // borderColor="teal.100"
      borderColor="blackAlpha.400"
      // p="3"
      justifyContent="space-between"
      bg="gray.50"
    >
      <Flex
        alignItems="center"
        // borderBottom="2px solid"
        // borderColor="teal.100"
        p="3"
        bg="gray.50"
      >
        <Avatar user={user} size="md" />
        <Box ml="4">
          <UsernameButton user={user} />

          <Text fontSize="sm" color="gray.500">
            {formatDistanceToNow(date)} ago
          </Text>
        </Box>
      </Flex>
      <Badge variant="subtle" border="0px" colorScheme="blue" mr="3" mt="9">
        {subject}
      </Badge>
    </Flex>
  );
}
