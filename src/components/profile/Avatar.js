import { Avatar as ChakraAvtar } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { LoginMessage } from "../message/Message";

export default function Avatar({ user, size = "xl", OverrideAvatar = null }) {
  const { DisplayLoginMessage } = LoginMessage();

  // if(!user) return 'Loading...'

  if (!user) {
    return (
      <ChakraAvtar
        onClick={DisplayLoginMessage}
        // as={Link}
        // to={`$/profile/${user.id}`}
        // name={user.username}
        size={size}
        // src={OverrideAvatar || user.avatar}
        name="User"
        src="https://firebasestorage.googleapis.com/v0/b/qnaplatform-f817d.appspot.com/o/avatars%2Fnot%20logged%20in.png?alt=media&token=82423a2f-8073-4440-9c7b-b30e58fd5029"
        _hover={{ cursor: "pointer", opacity: "0.4" }}
      />
    );
  }

  //   console.log(props.user);

  return (
    <ChakraAvtar
      as={Link}
      to={`/profile/${user.id}`}
      name={user.username}
      size={size}
      src={OverrideAvatar || user.avatar}
      _hover={{ cursor: "pointer", opacity: "0.4" }}
    />
  );
}
