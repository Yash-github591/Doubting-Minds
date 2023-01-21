import Post from './index'
import { Text, Box } from '@chakra-ui/react'

export default function PostsLists({ posts }) {
  return (
    <Box px='4' align='center'>
      {posts?.length === 0 ? (
        <Text textAlign='center' fontSize='xl'>
          No questions posted yet...
        </Text>
      ) : (
        posts?.map((post) => <Post key={post.id} post={post} />)
      )}
    </Box>
  )
}
