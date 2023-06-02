import Post from "./index";
import { Text, Box, Heading } from "@chakra-ui/react";
import { usePosts } from "../../hooks/Posts";
import { useParams } from "react-router-dom";

export default function SubjectLists() {
  const { posts, isLoading } = usePosts();
  const params = useParams();

  const subject = params.subject;

  if (isLoading) return "Loading Doubts...";

  //   console.log(posts[0]);
  //   console.log("This is subject list component where subject=", subject);
  //   if (subject === posts[0].subject) {
  //     console.log("equal");
  //   }

  let subjectPosts = [];
  posts?.forEach((element) => {
    if (element.subject === subject) {
      subjectPosts.push(element);
    }
  });

  //   console.log(posts);
  //   console.log(subjectPosts);

  return (
    <Box px="4" align="center">
      <Heading size="xl">{subject} Doubts</Heading>
      {subjectPosts?.length === 0 ? (
        <Text textAlign="center" fontSize="xl">
          No Doubts posted yet...
        </Text>
      ) : (
        subjectPosts?.map((post) => <Post key={post.id} post={post} />)
      )}
    </Box>
  );
}
