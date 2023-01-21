import {
  Button,
  Divider,
  Flex,
  HStack,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import { useParams } from 'react-router-dom'
import { useAuth } from 'hooks/auth'
import { usePosts } from 'hooks/Posts'
import { useUser } from 'hooks/users'
import PostsLists from '../post/postsLists'
import Avatar from './Avatar'
import EditProfile from './EditProfile'
import Loader from '../Loader'

export default function Profile() {
  const { id } = useParams()
  const { user, isLoading: userLoading } = useUser(id)
  const { posts, isLoading: postsLoading } = usePosts(id)
  const { user: authUser, isLoading: authLoading } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()

  if (userLoading) return <Loader />

  return (
    <Stack spacing='5'>
      <Flex p={['4', '6']} pos='relative' align='center'>
        <Avatar size='2xl' user={user} />

        {!authLoading && authUser && authUser.id === user.id && (
          <Button
            pos='absolute'
            mb='2'
            top='6'
            colorScheme='teal'
            onClick={onOpen}
          >
            Change Picture
          </Button>
        )}

        <Stack ml='10'>
          <Text fontSize='2xl'> {user.username} </Text>
          <HStack spacing='10'>
            <Text color='gray.700' fontSize={['sm', 'lg']}>
              Doubts Posted: {posts?.length}
            </Text>
            <Text color='gray.700' fontSize={['sm', 'lg']}>
              Joined: {format(user.date, 'MMMM YYY')}
            </Text>
          </HStack>
          <EditProfile isOpen={isOpen} onClose={onClose} />
        </Stack>
      </Flex>
      <Divider />
      {postsLoading ? (
        <Text> Answers are Loading... </Text>
      ) : (
        <PostsLists posts={posts} />
      )}
    </Stack>
  )
}
