import { useToast } from "@chakra-ui/react";

export function LoginMessage() {
  const toast = useToast();

  function DisplayLoginMessage() {
    toast({
      position: "top",
      title: "An error occurred.",
      description:
        "You are Not Logged In. In order to do this activity you need to be logged in first.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }
  return { DisplayLoginMessage };
}

{
  /* Modal Message */
}
{
  /* <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Message</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            You are Not Logged In. In order to do this activity you need to be
            logged in first.
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="teal"
              onClick={() => {
                navigate(LOGIN);
              }}
            >
              Login
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */
}
{
  /* Modal Message */
}
