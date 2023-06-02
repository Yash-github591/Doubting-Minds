import { useToast } from "@chakra-ui/react";
import { usePosts } from "../../hooks/Posts";
import NewPost from "../post/NewPost";
import PostsLists from "../post/postsLists";
import Buttons from "../layout/LinkButtons";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../../lib/routes";
import { LoginMessage } from "../message/Message";

export default function Dashboard() {
  const { posts, isLoading } = usePosts();
  const navigate = useNavigate();
  const toast = useToast();
  const { DisplayLoginMessage } = LoginMessage();

  if (isLoading) return "loading...";

  // console.log(posts);

  return (
    <>
      <NewPost />
      <PostsLists posts={posts} />
    </>
  );
}
