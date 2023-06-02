import { useState, useRef } from "react";
import { RxCross1 } from "react-icons/rx";
import {
  IconButton,
  Textarea,
  Heading,
  Button,
  HStack,
  Box,
  Select,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Image,
  FormControl,
  useToast,
} from "@chakra-ui/react";
import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import { useAddPost, usePosts } from "../../hooks/Posts";
import { useAuth } from "../../hooks/auth";
import PostsLists from "../post/postsLists";
import { BiImageAdd } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
// import { uuidv4 } from "@firebase/util";
import { useUpdateAvatar } from "../../hooks/users";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { LoginMessage } from "../message/Message";

export default function NewPost() {
  const [fileURL, setFileURL] = useState(null);
  const [postID, setPostID] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [displayImg, setDisplayImg] = useState(null);
  const [ImageUrl, setImageUrl] = useState(null);
  const [imgNameInStorage, setImgNameInStorage] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { addPost, isLoading: addingPost } = useAddPost();
  const { user, isLoading: authLoading } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { DisplayLoginMessage } = LoginMessage();

  const toast = useToast();
  const postIdValue = uuidv4();

  // console.log(postIdValue);

  function handleChange(event) {
    const file = event.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
      setFileURL(file);
      // setFileURL(URL.createObjectURL(file));
    }
  }

  function handleAddPost(formData) {
    if (!user) {
      DisplayLoginMessage();
      return;
    }
    const data = {
      ...formData,
    };
    // console.log(postID);

    if (ImageUrl) {
      addPost({
        id: postIdValue,
        uid: user.id,
        text: data.text,
        subject: data.subject,
        img: ImageUrl,
        imgNameInStorage,
        setImgNameInStorage,
      });
    } else {
      addPost({
        id: postIdValue,
        uid: user.id,
        text: data.text,
        subject: data.subject,
        img: null,
        imgNameInStorage,
        setImgNameInStorage,
      });
    }
    setDisplayImg(null);
    reset();
  }

  async function updateImage() {
    if (!fileURL) {
      toast({
        title: "No picture selected",
        description: "please select a file to upload",
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      return;
    }

    setFileLoading(true);
    // console.log(postID);
    if (postIdValue) {
      const fileRef = ref(storage, "posts/" + postIdValue);
      await uploadBytes(fileRef, fileURL);

      const val = fileRef.name;

      setImgNameInStorage(val);

      const Image = await getDownloadURL(fileRef);

      setImageUrl(Image);
    }

    toast({
      title: "Picture Added",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 5000,
    });

    setPostID(postIdValue);
    // console.log("Post id is:", postID);
    setFileURL(null);
    setFileLoading(false);
  }

  return (
    <Box maxW="600px" mx="auto" py="10">
      <form
        onSubmit={handleSubmit(handleAddPost)}
        // onSubmit={() => {
        //   if (!user) {
        //     DisplayLoginMessage();
        //   } else {
        //     handleSubmit(handleAddPost);
        //   }
        // }}
      >
        <HStack justify="space-between">
          <Heading size="lg">New Question</Heading>
        </HStack>
        <Textarea
          as={TextareaAutosize}
          resize="none"
          my="10px"
          placeholder="Ask a new doubt..."
          minRows={3}
          {...register("text", { required: true })}
          required
        ></Textarea>

        <HStack my=".5rem" alignItems="start">
          <img src={displayImg} alt="" />
        </HStack>

        <HStack justify="end">
          <Select
            placeholder="Subject tag"
            maxW="130px"
            required={true}
            {...register("subject", { required: true })}
          >
            <option value="Physics">Physics</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
            <option value="General">General Discussion </option>
          </Select>

          {/* Adding image to post */}
          <IconButton
            variant="outline"
            colorScheme="teal"
            aria-label="Send email"
            icon={<BiImageAdd />}
            onClick={() => {
              if (!user) {
                DisplayLoginMessage();
              } else {
                onOpen();
              }
            }}
          />
          {/* Modal Code */}
          <Modal
            isOpen={isOpen}
            size="lg"
            onClose={() => {
              setPhoto(null);
              setFileURL(null);
              onClose();
            }}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add Image</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <HStack spacing="5">
                  <Image
                    boxSize="250px"
                    src={photo}
                    fallbackSrc="https://via.placeholder.com/150"
                  />
                  <FormControl py="">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleChange}
                    />
                  </FormControl>
                </HStack>
                <HStack justifyContent="space-between">
                  <Button
                    onClick={() => {
                      const val = uuidv4();
                      setPostID(val);
                      // console.log(val);
                      // console.log(postID);
                      setDisplayImg(photo);
                      updateImage();
                    }}
                    loadingText="UpLoading"
                    w="130px"
                    my="6"
                    colorScheme="purple"
                    isLoading={fileLoading}
                  >
                    Upload Image
                  </Button>
                  <Button
                    onClick={() => {
                      if (fileURL) {
                        setFileURL(null);
                        setPhoto(null);
                      }
                    }}
                    // loadingText="UpLoading"
                    w="130px"
                    my="6"
                    colorScheme="purple"
                    // isLoading={fileLoading}
                  >
                    Discard Image
                  </Button>
                </HStack>
              </ModalBody>
            </ModalContent>
          </Modal>
          {/* Modal Code */}
          {/*************************/}

          <Button
            colorScheme="teal"
            type="submit"
            isLoading={authLoading || addingPost}
            loadingText="Loading"
          >
            Post Doubt
          </Button>
        </HStack>
      </form>
    </Box>
  );
}
