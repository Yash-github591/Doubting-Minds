import { Avatar as ChakraAvtar } from '@chakra-ui/react'
import { PROTECTED } from 'lib/routes'
import { Link } from 'react-router-dom'
import { LoginMessage } from '../Message'

export default function Avatar({ user, size = 'xl', OverrideAvatar = null }) {
  const { DisplayLoginMessage } = LoginMessage()

  if (!user) {
    return (
      <ChakraAvtar
        onClick={DisplayLoginMessage}
        size={size}
        name='User'
        src={process.env.defaultimage1}
        _hover={{ cursor: 'pointer', opacity: '0.4' }}
      />
    )
  }

  return (
    <ChakraAvtar
      as={Link}
      to={`${PROTECTED}/profile/${user.id}`}
      name={user.username}
      size={size}
      src={OverrideAvatar || user.avatar}
      _hover={{ cursor: 'pointer', opacity: '0.4' }}
    />
  )
}
