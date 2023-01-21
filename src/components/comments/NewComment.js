import {
  Box,
  Button,
  Flex,
  FormControl,
  HStack,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { BiImageAdd } from 'react-icons/bi'
import { useAuth } from 'hooks/auth'
import { useAddComment } from 'hooks/comments'
import Avatar from '../profile/Avatar'
import { useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { LoginMessage } from '../Message'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from 'lib/firebase'
import { v4 as uuidv4 } from 'uuid'
import reactTextareaAutosize from 'react-textarea-autosize'
import Loader from 'components/Loader'

export default function NewComment({ post }) {
  const { onOpen, isOpen, onClose } = useDisclosure()
  const [fileURL, setFileURL] = useState(null)
  const [photo, setPhoto] = useState(null)
  const [displayImg, setDisplayImg] = useState(null)
  const [ImageUrl, setImageUrl] = useState(null)
  const [imgNameInStorage, setImgNameInStorage] = useState(null)
  const [fileLoading, setFileLoading] = useState(false)
  const { DisplayLoginMessage } = LoginMessage()
  const { id: postID } = post
  const { user, isLoading: authLoading } = useAuth()
  const { handleSubmit, reset, register } = useForm()
  const { addComment, isLoading: commentLoading } = useAddComment({
    postID,
    uid: user?.id,
  })
  const toast = useToast()
  const commentId = uuidv4()

  const fileRef = ref(storage, 'comments/' + commentId)

  function handleAddComment(data) {
    if (!user) {
      DisplayLoginMessage()
      return
    }

    if (ImageUrl) {
      addComment({
        text: data.text,
        id: commentId,
        img: ImageUrl,
        imgNameInStorage,
        setImgNameInStorage,
      })
    } else {
      addComment({
        text: data.text,
        id: commentId,
        img: null,
        imgNameInStorage,
        setImgNameInStorage,
      })
    }
    setImageUrl(null)
    setDisplayImg(null)
    reset()
  }

  function handleChange(event) {
    const file = event.target.files[0]
    if (file) {
      setPhoto(URL.createObjectURL(file))
      setFileURL(file)
    }
  }

  async function updateImage() {
    if (!fileURL) {
      toast({
        title: 'No picture selected',
        description: 'please select a file to upload',
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 5000,
      })
      return
    }

    setFileLoading(true)
    await uploadBytes(fileRef, fileURL)
    const val = fileRef.name
    setImgNameInStorage(val)

    const Image = await getDownloadURL(fileRef)

    const photo = URL.createObjectURL(fileURL)
    setDisplayImg(photo)
    setImageUrl(Image)

    toast({
      title: 'Picture Added',
      status: 'success',
      isClosable: true,
      position: 'top',
      duration: 5000,
    })

    setFileURL(null)
    setFileLoading(false)
  }

  if (authLoading) return <Loader/>

  return (
    <Box maxW='200px' mx='auto'>
      <Flex padding='4'>
        <Avatar user={user} size='sm' />
        <Box flex='1' ml='4'>
          <form onSubmit={handleSubmit(handleAddComment)}>
            <Box>
              <Textarea
                as={reactTextareaAutosize}
                resize='none'
                my='10px'
                placeholder='Provide an answer to the doubt ...'
                minRows={3}
                {...register('text', { required: true })}
                required
              ></Textarea>
              <HStack>
                <img src={displayImg} alt='' />
              </HStack>
            </Box>
            <Flex pt='2'>
              <IconButton
                variant='outline'
                colorScheme='teal'
                aria-label='Send email'
                icon={<BiImageAdd />}
                ml='auto'
                size='sm'
                onClick={() => {
                  if (!user) {
                    DisplayLoginMessage()
                  } else {
                    onOpen()
                  }
                }}
              />
              <Modal
                isOpen={isOpen}
                size='lg'
                onClose={() => {
                  setPhoto(null)
                  setFileURL(null)
                  onClose()
                }}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Add Image</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <HStack spacing='5'>
                      <Image
                        boxSize='250px'
                        src={photo}
                        fallbackSrc='https://via.placeholder.com/150'
                      />
                      <FormControl py=''>
                        <input
                          type='file'
                          accept='image/*'
                          onChange={handleChange}
                        />
                      </FormControl>
                    </HStack>
                    <HStack justifyContent='space-between'>
                      <Button
                        onClick={() => {
                          updateImage()
                        }}
                        loadingText='UpLoading'
                        my='6'
                        colorScheme='purple'
                        isLoading={fileLoading}
                      >
                        Upload Image
                      </Button>
                      <Button
                        onClick={() => {
                          if (fileURL) {
                            setFileURL(null)
                            setPhoto(null)
                          }
                        }}
                        my='6'
                        colorScheme='purple'
                      >
                        Discard Image
                      </Button>
                    </HStack>
                  </ModalBody>
                </ModalContent>
              </Modal>
              <Button
                isLoading={commentLoading || authLoading}
                type='submit'
                colorScheme='teal'
                size='sm'
                ml='20px'
              >
                Add Answer
              </Button>
            </Flex>
          </form>
        </Box>
      </Flex>
    </Box>
  )
}
