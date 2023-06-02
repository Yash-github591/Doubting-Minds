import { Box, Flex, Image, Stack } from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { SUBJECTS } from "../../lib/routes";
import Avatar from "../profile/Avatar";

export default function LinkButtons() {
  const navigate = useNavigate();
  return (
    <div>
      <Stack direction="column" mt="10px">
        <Flex>
          <Link to={`/subjects/Physics`}>
            <Image
              borderRadius="10"
              m="6px"
              boxSize="110px"
              objectFit="cover"
              _hover={{ cursor: "pointer", opacity: "0.4" }}
              src="https://firebasestorage.googleapis.com/v0/b/qnaplatform-f817d.appspot.com/o/images%2Fphysics%20doubts.jpg?alt=media&token=ab2327b3-5e95-4e65-9b31-1f6479a81da8"
            />
          </Link>
          <Link to={`/subjects/Chemistry`}>
            <Image
              borderRadius="10"
              m="6px"
              boxSize="110px"
              objectFit="cover"
              _hover={{ cursor: "pointer", opacity: "0.4" }}
              src="https://firebasestorage.googleapis.com/v0/b/qnaplatform-f817d.appspot.com/o/images%2Fchemistry%20doubts.jpg?alt=media&token=b11f0e50-1f71-4901-a6a7-ad41ad1e7dbb"
            />
          </Link>
        </Flex>
        <Flex>
          <Link to={`/subjects/Mathematics`}>
            <Image
              borderRadius="10"
              m="6px"
              boxSize="110px"
              objectFit="cover"
              _hover={{ cursor: "pointer", opacity: "0.4" }}
              src="https://firebasestorage.googleapis.com/v0/b/qnaplatform-f817d.appspot.com/o/images%2Fmaths%20doubts.jpg?alt=media&token=e9ef5ea5-9de9-490d-b8d5-92d1bc534735"
            />
          </Link>
          <Link to={`/subjects/Biology`}>
            <Image
              borderRadius="10"
              m="6px"
              boxSize="110px"
              objectFit="cover"
              _hover={{ cursor: "pointer", opacity: "0.4" }}
              src="https://firebasestorage.googleapis.com/v0/b/qnaplatform-f817d.appspot.com/o/images%2Fbiology%20doubts.jpg?alt=media&token=b1a792c6-0e81-40d2-a0eb-69959ce27c24"
            />
          </Link>
        </Flex>
        <Flex justifyContent="center">
          <Link to={`/subjects/General`}>
            <Image
              borderRadius="10"
              m="6px"
              boxSize="110px"
              _hover={{ cursor: "pointer", opacity: "0.4" }}
              src="https://firebasestorage.googleapis.com/v0/b/qnaplatform-f817d.appspot.com/o/images%2Fgeneral%20discussions.jpg?alt=media&token=b9e7850c-ac1b-4f46-94db-5a1eb5d45884"
            />
          </Link>
        </Flex>
      </Stack>
    </div>
  );
}
