import { Button, Link, Flex, Image, Text } from "@chakra-ui/react";
import { DASHBOARD, LOGIN, ROOT } from "../../lib/routes";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth, useLogOut } from "../../hooks/auth";

export default function Navbar() {
  const { user, isLoading: userLoading } = useAuth();
  const { logout, isLoading } = useLogOut();
  const navigate = useNavigate();

  return (
    <Flex
      shadow="sm"
      pos="fixed"
      width="full"
      height="16"
      zIndex="3"
      justify="center"
      bg="white"
    >
      <Flex
        px="4"
        w="full"
        align="center"
        maxW="1200px"
        justifyContent="space-between"
      >
        <Link
          as={RouterLink}
          to={ROOT}
          fontWeight="bold"
          fontSize="2xl"
          fontStyle="italic"
          fontFamily="cursive"
        >
          Doubting Minds
        </Link>

        {user && (
          <Button
            // ml="auto"
            colorScheme="teal"
            size="sm"
            onClick={logout}
            isLoading={isLoading}
          >
            Logout
          </Button>
        )}
        {!user && (
          <Button
            // ml="auto"
            colorScheme="teal"
            size="sm"
            onClick={() => navigate(LOGIN)}
          >
            Login
          </Button>
        )}
      </Flex>
    </Flex>
  );
}
