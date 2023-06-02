import { auth, db } from "../lib/firebase";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { DASHBOARD, LOGIN, ROOT } from "../lib/routes";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { setDoc, doc, getDoc } from "firebase/firestore";
import isUsernameExists from "../utils/isUsernameExists";

// This is a custom hook that we will use to check if the user is logged in or not
// and if the user is logged in then we will get the user data from firestore and store it in the state.

// This hook will return an object with three properties user, isLoading and error.
export const useAuth = () => {
  // useAuthState is a hook provided by react-firebase-hooks/auth to check if the user is logged in or not.
  // authLoading is a boolean value which will be true if the user is not logged in and false if the user is logged in.
  // authUser is the user object which will contain the user data if the user is logged in.
  // error is the error object which will contain the error data if there is any error while checking if the user is logged in or not.
  const [authUser, authLoading, error] = useAuthState(auth);
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // This function will fetch the user data from firestore and store it in the state named user.
    async function fetchData() {
      setLoading(true);
      const ref = doc(db, "users", authUser.uid); // get the reference of the user document from firestore using the user id

      const docSnap = await getDoc(ref); // get the document snapshot from firestore using the reference of the user document

      setUser(docSnap.data()); // set the user state with the user data from firestore document

      setLoading(false);
    }

    // If the authLoading is false then it means that the user is logged in and we can
    // fetch the user data from firestore.
    // If the authLoading is true then it means that the user is not logged in and we don't need to fetch the user data.
    if (!authLoading) {
      if (authUser) {
        fetchData();
      } else {
        setLoading(false);
      }
    }
  }, [authLoading]); // We are adding authLoading in the dependency array so that whenever the authLoading changes useEffect will run again.

  return { user, isLoading, error };
};

// This is a custom hook that we will use to login the user.
// This hook will return an object with two properties login and isLoading.
export function useLogin() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  // This function will login the user using the email and password provided as arguments.
  async function login({ email, password, redirectTo = DASHBOARD }) {
    setLoading(true);

    try {
      // signInWithEmailAndPassword is a function provided by firebase/auth to login the user using email and password.
      await signInWithEmailAndPassword(auth, email, password);

      // If the login is successful then we will redirect the user to the dashboard page.
      toast({
        title: "You are logged in",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      navigate(redirectTo);
    } catch (error) {
      // If there is any error while logging in the user then we will show the error to the user.
      toast({
        title: "logging in failed",
        status: "error",
        description: error.message,
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      setLoading(false);
      return false; // return false if login failed
    }

    return true; // return true if login succeded
  }
  return { login, isLoading }; // return the login function and isLoading state variable from the hook
}

// This is a custom hook that we will use to register the user.
// This hook will return an object with two properties register and isLoading.
export const useRegister = () => {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  // This function will register the user using the email, password and username provided as arguments.
  async function register({
    username,
    email,
    password,
    redirectTo = DASHBOARD,
  }) {
    setLoading(true);

    // Check if the username already exists or not.
    const usernameExists = await isUsernameExists(username);

    // If the username already exists then we will show the error to the user.
    if (usernameExists) {
      toast({
        title: "Username already exists",
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      setLoading(false);
      return false;
    } else {
      // If the username does not exists then we will create the user using the email and password provided as arguments.
      try {
        console.log("creating accoount");
        // createUserWithEmailAndPassword is a function provided by firebase/auth to create the user using email and password.
        const res = await createUserWithEmailAndPassword(auth, email, password);

        // After creating the user we will add the user data to firestore.
        await setDoc(doc(db, "users", res.user.uid), {
          id: res.user.uid, // user id
          username: username.toLowerCase(), // username in lowercase to avoid case sensitivity
          avatar: "", // avatar url of the user (we will add this later)
          date: Date.now(), // timestamp when the user is created
        });

        toast({
          title: "Account Created",
          description: "You are logged in",
          status: "success",
          isClosable: true,
          position: "top",
          duration: 5000,
        });

        navigate(redirectTo);
      } catch (error) {
        // If there is any error while creating the user then we will show the error to the user.
        toast({
          title: "Signup failed",
          description: error.message,
          status: "error",
          isClosable: true,
          position: "top",
          duration: 5000,
        });
      } finally {
        // this section runs whether the try block success or fails so we will set the loading state to false.
        // We will set the loading state to false so that the user can click on the register button again.
        setLoading(false);
      }
    }
  }

  return { register, isLoading }; // return the register function and isLoading state variable from the hook
};

// This is a custom hook that we will use to logout the user.
export const useLogOut = () => {
  // signOut is a function provided by firebase/auth to logout the user.
  // It will return a promise that will resolve when the user is logged out.
  // it returns an array with three values [signOut, isLoading, error] but we are only interested in the signOut function.
  const [signOut, isLoading, error] = useSignOut(auth);
  const toast = useToast();
  const navigate = useNavigate();

  // This function will logout the user.
  async function logout() {
    if (await signOut()) {
      // If the logout is successful then we will redirect the user to the root page.
      toast({
        title: "Successfully logged out",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      navigate(ROOT);
    }
  }
  // return the logout function and isLoading state variable from the hook.
  return { logout, isLoading };
};
