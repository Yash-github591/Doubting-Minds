import { Box, Flex, IconButton, Text } from '@chakra-ui/react'
import { formatDistanceToNow } from 'date-fns'
import { FaTrash } from 'react-icons/fa'
import { useAuth } from 'hooks/auth'
import { useDeleteComment } from 'hooks/comments'
import { useUser } from 'hooks/users'
import Avatar from 'components/profile/Avatar'
import UsernameButton from '../profile/usernameButton'
import Loader from '../Loader'

export default function Comment({ comment }) {
  const { text, uid, date, img } = comment
  const { user, isLoading } = useUser(uid)
  const { user: authUser, isLoading: authLoading } = useAuth()
  const { deleteComment, isLoading: deleteLoading } = useDeleteComment(comment)

  if (isLoading) return <Loader />

  return (
    <Box
      px='4'
      py='2'
      maxW='600px'
      mx='auto'
      textAlign='left'
      border='1px'
      borderStyle='solid'
      borderRadius='10px'
      m='10px'
    >
      <Flex pb='2'>
        <Avatar user={user} size='sm' />
        <Box flex='1' ml='4'>
          <Flex borderBottom='1px solid' borderColor='teal.100' pb='2'>
            <Box>
              <UsernameButton user={user} />
              <Text fontSize='xs' color='gray.500'>
                {formatDistanceToNow(date)} ago
              </Text>
            </Box>
            {!authLoading && authUser && authUser.id === uid && (
              <IconButton
                size='sm'
                ml='auto'
                icon={<FaTrash />}
                colorScheme='red'
                variant='ghost'
                isRound
                onClick={deleteComment}
                isLoading={deleteLoading}
              />
            )}
          </Flex>
          <Box pt='2' fontSize='sm'>
            <Text whiteSpace='pre-wrap'>{text}</Text>
            <img src={img} alt='' />
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}
