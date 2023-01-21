import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { useAuth } from 'hooks/auth'
import { useUpdateAvatar } from 'hooks/users'
import Avatar from './Avatar'
import Loader from '../Loader'

export default function EditProfile({ isOpen, onClose }) {
  const { user, isLoading: authLoading } = useAuth()
  const {
    setFile,
    updateAvatar,
    isLoading: fileLoading,
    fileURL,
  } = useUpdateAvatar(user?.id)

  function handleChange(event) {
    setFile(event.target.files[0])
  }

  if (authLoading) return <Loader />

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton avatar />
        <ModalBody>
          <HStack spacing='5'>
            <Avatar user={user} OverrideAvatar={fileURL} />
            <FormControl py='4'>
              <FormLabel htmlFor='picture'>Change Picture</FormLabel>
              <input type='file' accept='image/*' onChange={handleChange} />
            </FormControl>
          </HStack>
          <Button
            onClick={updateAvatar}
            loadingText='UpLoading'
            w='full'
            my='6'
            colorScheme='purple'
            isLoading={fileLoading}
          >
            Save
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
