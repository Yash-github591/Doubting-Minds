import { Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaComment, FaRegComment, FaTrash } from "react-icons/fa";
import { MdQuestionAnswer, MdOutlineQuestionAnswer } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { useComments } from "../../hooks/comments";
import { useToggleLike, useDeletePost } from "../../hooks/Posts";
// import { PROTECTED } from "../../lib/routes";
import Comments from "../comments";

export default function Actions({ post }) {
  const { id, uid, text, date, likes } = post;
  const { user, isLoading: userLoading } = useAuth();
  const { deletePost, isLoading: deleteLoading } = useDeletePost(post);

  const isLiked = user ? likes.includes(user?.id) : false;
  // const isLiked = likes.includes(user?.id);

  // console.log(likes.length);
  // console.log(user);

  const inputObj = {
    id,
    isLiked,
    uid: user ? user.id : null,
    // uid: user?.id,
  };
  const { toggleLike, isLoading: likeLoading } = useToggleLike(inputObj);
  const { comments, isLoading: commentsLoading } = useComments(id);

  // console.log(comments);

  return (
    <Flex p="2">
      <Flex alignItems="center">
        <IconButton
          onClick={toggleLike}
          isLoading={userLoading || likeLoading}
          size="md"
          colorScheme="blackAlpha"
          variant="ghost"
          icon={isLiked === true ? <AiFillLike /> : <AiOutlineLike />}
          isRound
        />
        {likes?.length}
      </Flex>

      <Flex alignItems="center" ml="2">
        <IconButton
          as={Link}
          to={`/comments/${id}`}
          // onClick={toggleLike}
          // isLoading={userLoading || likeLoading}
          size="md"
          colorScheme="teal"
          variant="ghost"
          icon={
            comments?.length ? (
              <MdQuestionAnswer />
            ) : (
              <MdOutlineQuestionAnswer />
            )
          }
          isRound
        />
        {comments?.length}
      </Flex>

      {!userLoading && user && user.id === uid && (
        <IconButton
          ml="auto"
          onClick={deletePost}
          size="md"
          colorScheme="red"
          variant="ghost"
          icon={<FaTrash />}
          isRound
        />
      )}
    </Flex>
  );
}
