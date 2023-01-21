import { Button, Code, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { PROTECTED } from 'lib/routes'
import Avatar from '../profile/Avatar'

export default function User({ user }) {
  const { id, username } = user

  return (
    <VStack
      bg='gray.100'
      shadow='sm'
      rounded='md'
      textAlign='center'
    >
      <Avatar user={user} />
      <Code>@{username}</Code>
      <Link>
        <Button
          as={Link}
          to={`${PROTECTED}/profile/${id}`}
          size='sm'
          variant='Link'
          colorScheme='teal'
        >
          View Profile
        </Button>
      </Link>
    </VStack>
  )
}
