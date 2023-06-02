import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function UsernameButton({ user }) {
  return (
    <Button
      as={Link}
      to={`/profile/${user.id}`}
      colorScheme="teal"
      variant="link"
    >
      {user.username}
    </Button>
  );
}
