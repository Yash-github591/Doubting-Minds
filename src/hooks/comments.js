import { useToast } from "@chakra-ui/react";
import { uuidv4 } from "@firebase/util";
import {
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db, storage } from "../lib/firebase";

// this hook is used to add a comment to a post and to update the comments count in the post document

export function useAddComment({ postID, uid }) {
  const [isLoading, setLoading] = useState(false); // to show a spinner while the comment is being added
  const toast = useToast();

  // this function is used to add a comment to a post and to update the comments count in the post document
  async function addComment({
    text, // the comment text
    id, // the comment id
    img, // the comment image
    imgNameInStorage, // the comment image name in storage
    setImgNameInStorage, // a function to set the comment image name in storage
  }) {
    setLoading(true);

    const date = Date.now();
    const docRef = doc(db, "comments", id); // the comment document reference in firestore database having the comment id
    await setDoc(docRef, {
      img, // the comment image
      imgNameInStorage, // the comment image name in storage
      text, // the comment text
      id, // the comment id
      postID, // the post id
      uid, // the user id
      date, // the comment date
    }); // set the comment document data in firestore database having the comment id as the document id

    toast({
      title: "Answer added",
      status: "success",
      isClosable: "true",
      position: "top",
      duration: 5000,
    });

    // set the comment image name in storage to null so that the next comment can be added without any error
    setImgNameInStorage(null);
    setLoading(false);
  }

  return { addComment, isLoading }; // return the addComment function and the isLoading state
}

// this hook is used to get the comments of a post from firestore database
export function useComments(postID) {
  // q is the query to get the comments of a post from firestore database
  // the comments are ordered by date in ascending order
  // the comments are filtered by postID
  const q = query(
    collection(db, "comments"),
    where("postID", "==", postID),
    orderBy("date", "asc")
  );

  // useCollectionData is a react-firebase-hooks hook to get the data from firestore database
  // comments is an array of comments of a post from firestore database
  // isLoading is a boolean to show a spinner while the comments are being fetched
  // error is an error object if there is any error while fetching the comments
  const [comments, isLoading, error] = useCollectionData(q);

  if (error) throw error;

  // return the comments array and the isLoading state to show a spinner while the comments are being fetched
  return { comments, isLoading };
}

// this hook is used to delete a comment from firestore database from storage
export function useDeleteComment(comment) {
  const [isLoading, setLoading] = useState(false); // to show a spinner while the comment is being deleted
  const { text, uid, date, id, imgNameInStorage } = comment; // the comment object
  const toast = useToast();

  async function deleteComment() {
    // show a confirmation dialog to the user to confirm the deletion of the comment
    // window.confirm is a browser api to show a confirmation dialog to the user
    const res = window.confirm("Are you sure you want to delete this answer ?");

    if (res) {
      setLoading(true);
      const docRef = doc(db, "comments", id); // the comment document reference in firestore database having the comment id
      const imgRef = ref(storage, "comments/" + imgNameInStorage); // the comment image reference in storage having the comment image name in storage
      await deleteDoc(docRef); // delete the comment document from firestore database having the comment id as the document id
      await deleteObject(imgRef); // delete the comment image from storage having the comment image name in storage
      toast({
        title: "Answer deleted",
        status: "info",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      setLoading(false);
    }
  }

  // return the deleteComment function and the isLoading state to show a spinner while the comment is being deleted
  return { deleteComment, isLoading };
}
