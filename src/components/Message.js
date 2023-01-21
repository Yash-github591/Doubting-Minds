import { useToast } from '@chakra-ui/react'

export function LoginMessage() {
  const toast = useToast()

  function DisplayLoginMessage() {
    toast({
      position: 'top',
      title: 'An error occurred.',
      description:
        'You are Not Logged In. In order to do this activity you need to be logged in first.',
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  }
  return { DisplayLoginMessage }
}
