import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { usePost } from "../../hooks/Posts";
import Post from "../post/index";
import NewComment from "./NewComment";
import CommentList from "./CommentList";

export default function Comments() {
  const { id } = useParams();

  const { post, isLoading } = usePost(id);

  if (isLoading) return "Loading ...";

  return (
    <Box align="center" pt="50">
      <Post post={post} ImageDisplay="true" needWhiteSpace="true" />
      <NewComment post={post} />
      <CommentList post={post} />
    </Box>
  );
}
