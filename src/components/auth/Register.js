import {
  FormControl,
  FormLabel,
  Input,
  Heading,
  Center,
  Box,
  Link,
  Button,
  Text,
  FormErrorMessage,
} from '@chakra-ui/react'
import { DASHBOARD, LOGIN } from 'lib/routes'
import { Link as RouterLink } from 'react-router-dom'
import { useRegister } from 'hooks/auth'
import { useForm } from 'react-hook-form'
import {
  emailValidate,
  passwordValidate,
  usernameValidate,
} from 'utils/form-validate'

export default function Register() {
  const { register: signup, isLoading } = useRegister()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  async function handleRegister(data) {
    signup({
      username: data.username,
      email: data.email,
      password: data.password,
      redirectTo: DASHBOARD,
    })
  }

  return (
    <Center w='100%' h='100vh'>
      <Box maxW='nd' p='9' borderWidth='1px' borderRadius='lg'>
        <Heading mb='4' size='lg' textAlign='center'>
          Register
        </Heading>
        <form onSubmit={handleSubmit((data) => handleRegister(data))} action=''>
          <FormControl isInvalid={errors.username} py='2'>
            <FormLabel> Username </FormLabel>
            <Input
              placeholder='username'
              {...register('username', usernameValidate)}
            ></Input>
            <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.email?.message} py='2'>
            <FormLabel> Email </FormLabel>
            <Input
              type='email'
              placeholder='user@email.com'
              {...register('email', emailValidate)}
            ></Input>
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.password?.message} py='2'>
            <FormLabel> Password </FormLabel>
            <Input
              type='password'
              placeholder='password123'
              {...register('password', passwordValidate)}
            ></Input>
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>

          <Button
            type='submit'
            colorScheme='teal'
            size='md'
            w='full'
            isLoading={isLoading}
            loadingText='Signing Up'
          >
            Register
          </Button>
        </form>
        <Text fontSize='xlg' align='center' mt='6'>
          Already have an account?{' '}
          <Link
            color='teal.800'
            fontWeight='medium'
            textDecor='underline'
            to={LOGIN}
            _hover={{ background: 'teal.100' }}
          >
            Login
          </Link>{' '}
          instead
        </Text>
      </Box>
    </Center>
  )
}
