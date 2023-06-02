import { Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { DASHBOARD, LOGIN } from "../../lib/routes";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(DASHBOARD);
  }, []);

  return (
    <Box wordBreak="break-word">
      {" "}
      Hello, this is the Landing page of the web site. It is not designed yet!
      ... Go to login Page by clicking here{"    "}
      <Link to={LOGIN}>
        <Button>Login</Button>
      </Link>
    </Box>
  );
}
