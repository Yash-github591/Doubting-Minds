import Post from "./index";
import { Text, Box } from "@chakra-ui/react";
import { useAuth } from "../../hooks/auth";

export default function PostsLists({ posts }) {
  const { user, isLoading: userLoading } = useAuth();

  // console.log(user?.id);
  // console.log(posts);

  return (
    <Box px="4" align="center">
      {posts?.length === 0 ? (
        <Text textAlign="center" fontSize="xl">
          No questions posted yet...
        </Text>
      ) : (
        posts?.map((post) => <Post key={post.id} post={post} />)
      )}
    </Box>
  );
}
