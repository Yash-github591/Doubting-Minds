import { useToast } from "@chakra-ui/react";
import { uuidv4 } from "@firebase/util";
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { db, storage } from "../lib/firebase";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./auth";
import { LoginMessage } from "../components/message/Message";
import { DASHBOARD } from "../lib/routes";
import { deleteObject, ref } from "firebase/storage";

export function useAddPost() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  // async function addPost(post) {
  async function addPost({
    id,
    uid,
    text,
    subject,
    img,
    imgNameInStorage,
    setImgNameInStorage,
  }) {
    // console.log(post);
    setLoading(true);
    // console.log(post.id);
    await setDoc(doc(db, "posts", id), {
      id,
      uid,
      text,
      subject,
      img,
      imgNameInStorage,
      date: Date.now(),
      likes: [],
    });

    toast({
      title: "Question added Successfully!",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 5000,
    });

    setImgNameInStorage(null);
    setLoading(false);
  }

  return { addPost, isLoading };
}

export function usePosts(uid = null) {
  // console.log(uid);
  const q = uid
    ? query(
        collection(db, "posts"),
        orderBy("date", "desc"),
        where("uid", "==", uid)
      )
    : query(collection(db, "posts"), orderBy("date", "desc"));
  const [posts, isLoading, error] = useCollectionData(q);
  if (error) throw error;
  return { posts, isLoading };
}

export function useToggleLike({ id, isLiked, uid }) {
  //  uid = current user id
  // console.log(id);
  const { DisplayLoginMessage } = LoginMessage();
  const [isLoading, setLoading] = useState(false);

  async function toggleLike() {
    if (!uid) {
      DisplayLoginMessage();
      return;
    }
    setLoading(true);
    const docRef = doc(db, "posts", id);
    await updateDoc(docRef, {
      likes: isLiked === true ? arrayRemove(uid) : arrayUnion(uid),
    });

    setLoading(false);
  }

  return { toggleLike, isLoading };
}

export function useDeletePost(post) {
  const [isLoading, setLoading] = useState(false);
  const { pathname } = useLocation();
  const toast = useToast();
  const navigate = useNavigate();

  const { id, imgNameInStorage } = post;

  async function deletePost() {
    const res = window.confirm(
      "Are you sure you want to delete this question ?"
    );

    if (pathname.startsWith("/comments")) {
      navigate(DASHBOARD);
    }

    if (res) {
      setLoading(true);

      // Delete post
      await deleteDoc(doc(db, "posts", id));

      // Delete Image
      const imgRef = ref(storage, "posts/" + imgNameInStorage);
      await deleteObject(imgRef);

      // Delete comments
      async function deleteComment(docRef) {
        deleteDoc(docRef); // delete the comment document from firestore
      }

      // q is a reference to the document in firestore where postID == id (post id)
      const q = query(collection(db, "comments"), where("postID", "==", id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => deleteComment(doc.ref)); // delete all the comments of the post with id = id (post id)

      toast({
        title: "Post deleted",
        status: "info",
        isClosable: true,
        position: "top",
        duration: 5000,
      });

      setLoading(false);
    }
  }

  return { deletePost, isLoading };
}

// this hook returns a post object having the post data and isLoading state
export function usePost(id) {
  const q = doc(db, "posts", id); // q is a reference to the document in firestore
  const [post, isLoading, error] = useDocumentData(q); // post is the post object
  if (error) throw error; // if there is an error, throw it to the parent component

  return { post, isLoading };
}
