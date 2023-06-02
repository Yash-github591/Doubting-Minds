import { Text, Box, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Actions from "./actions";
import Header from "./header";

export default function Post({
  post,
  // ImageDisplay = "false",
  ImageDisplay = "true", // it is initialized to 'false' if we don't  want to display the image for posts and 'true' for vice versa
  needWhiteSpace = "false",
}) {
  const { pathname } = useLocation();
  const { id, text, uid, date, img } = post;
  return (
    <Box p="2" maxW="600px" textAlign="left">
      <Box
        border="2px solid"
        borderColor="gray.100"
        borderRadius="16"
        _hover={
          (pathname.startsWith("/dashboard") ||
            pathname.startsWith("/subjects") ||
            pathname.startsWith("/profile")) && {
            boxShadow: "dark-lg",
          }
        }
      >
        {/* </Box> */}
        <Header post={post} />
        {pathname.startsWith("/comments") && (
          <Box p="2" minH="100px">
            <Text wordBreak="break-word" fontSize="md">
              {needWhiteSpace === "true" && (
                <Text whiteSpace="pre-wrap"> {text} </Text>
              )}

              {needWhiteSpace === "false" && <Text> {text} </Text>}
              {ImageDisplay === "true" && img && <Image src={img} />}
            </Text>
          </Box>
        )}

        {(pathname.startsWith("/dashboard") ||
          pathname.startsWith("/subjects") ||
          pathname.startsWith("/profile")) && (
          <Link to={`/comments/${id}`}>
            <Box
              p="2"
              minH="100px"
              _hover={{ cursor: "pointer", opacity: "0.4" }}
            >
              <Text wordBreak="break-word" fontSize="md">
                {needWhiteSpace === "true" && (
                  <Text whiteSpace="pre-wrap"> {text} </Text>
                )}

                {needWhiteSpace === "false" && <Text> {text} </Text>}
                {ImageDisplay === "true" && img && <Image src={img} />}
              </Text>
            </Box>
          </Link>
        )}
        <Actions post={post} />
      </Box>
    </Box>
  );
}
