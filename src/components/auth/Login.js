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
} from "@chakra-ui/react";
import { DASHBOARD, REGISTER } from "../../lib/routes";
import { Link as RouterLink } from "react-router-dom";
import React from "react";
import { useLogin } from "../../hooks/auth";
import { useForm } from "react-hook-form"; // useForm is a custom hook provided by react-hook-form library to handle forms in react
import { emailValidate, passwordValidate } from "../../utils/form-validate";

export default function Login() {
  const { login, isLoading } = useLogin(); // login is a function that takes in an object with email, password and redirectTo properties
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  async function handleLogin(data) {
    // console.log(data);
    const succeded = await login({
      email: data.email,
      password: data.password,
      redirectTo: DASHBOARD,
    });
    if (succeded) reset();
  }

  return (
    <Center w="100%" h="100vh">
      <Box mx="1" maxW="nd" p="9" borderWidth="1px" borderRadius="lg">
        <Heading mb="4" size="lg" textAlign="center">
          Log In
        </Heading>
        <form onSubmit={handleSubmit((data) => handleLogin(data))} action="">
          <FormControl isInvalid={errors.email?.message} py="2">
            <FormLabel> Email </FormLabel>
            <Input
              type="email"
              placeholder="user@email.com"
              {...register("email", emailValidate)}
            ></Input>
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.password?.message} py="2">
            <FormLabel> Password </FormLabel>
            <Input
              type="password"
              placeholder="password123"
              {...register("password", passwordValidate)}
            ></Input>
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>

          <Button
            mt="4"
            type="submit"
            colorScheme="teal"
            size="md"
            w="full"
            isLoading={isLoading}
            loadingText="Logging In"
          >
            Log In
          </Button>
        </form>
        <Text fontSize="xlg" align="center" mt="6">
          Don't have an account?{" "}
          <Link
            as={RouterLink}
            color="teal.800"
            fontWeight="medium"
            textDecor="underline"
            to={REGISTER}
            _hover={{ background: "teal.100" }}
          >
            Register
          </Link>{" "}
          instead
        </Text>
      </Box>
    </Center>
  );
}
