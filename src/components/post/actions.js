import { Flex, IconButton } from '@chakra-ui/react'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { FaTrash } from 'react-icons/fa'
import { MdQuestionAnswer, MdOutlineQuestionAnswer } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useAuth } from 'hooks/auth'
import { useComments } from 'hooks/comments'
import { useToggleLike, useDeletePost } from 'hooks/Posts'
import { PROTECTED } from 'lib/routes'

export default function Actions({ post }) {
  const { id, uid, likes } = post
  const { user, isLoading: userLoading } = useAuth()
  const { deletePost } = useDeletePost(post)

  const isLiked = user ? likes.includes(user?.id) : false

  const inputObj = {
    id,
    isLiked,
    uid: user ? user.id : null,
  }
  const { toggleLike, isLoading: likeLoading } = useToggleLike(inputObj)
  const { comments } = useComments(id)

  return (
    <Flex p='2'>
      <Flex alignItems='center'>
        <IconButton
          onClick={toggleLike}
          isLoading={userLoading || likeLoading}
          colorScheme='blackAlpha'
          variant='ghost'
          icon={isLiked === true ? <AiFillLike /> : <AiOutlineLike />}
          isRound
        />
        {likes?.length}
      </Flex>

      <Flex alignItems='center' ml='2'>
        <IconButton
          as={Link}
          to={`${PROTECTED}/comments/${id}`}
          colorScheme='teal'
          variant='ghost'
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
          ml='auto'
          onClick={deletePost}
          size='lg'
          colorScheme='red'
          variant='ghost'
          icon={<FaTrash />}
          isRound
        />
      )}
    </Flex>
  )
}
