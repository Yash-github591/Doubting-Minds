import { useToast } from '@chakra-ui/react'
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
} from 'firebase/firestore'
import { useState } from 'react'
import { db, storage } from 'lib/firebase'
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore'
import { useLocation, useNavigate } from 'react-router-dom'
import { LoginMessage } from 'components/Message'
import { DASHBOARD } from 'lib/routes'
import { deleteObject, ref } from 'firebase/storage'

export function useAddPost() {
  const [isLoading, setLoading] = useState(false)
  const toast = useToast()

  async function addPost({
    id,
    uid,
    text,
    subject,
    img,
    imgNameInStorage,
    setImgNameInStorage,
  }) {
    setLoading(true)
    await setDoc(doc(db, 'posts', id), {
      id,
      text,
      subject,
      img,
      imgNameInStorage,
      date: Date.now(),
      likes: [],
    })

    toast({
      title: 'Question added Successfully!',
      status: 'success',
      isClosable: true,
      position: 'top',
      duration: 5000,
    })

    setImgNameInStorage(null)
    setLoading(false)
  }

  return { addPost, isLoading }
}

export function usePosts(uid = null) {
  const q = uid
    ? query(
        collection(db, 'posts'),
        orderBy('date', 'desc'),
        where('uid', '==', uid)
      )
    : query(collection(db, 'posts'), orderBy('date', 'desc'))
  const [posts, isLoading, error] = useCollectionData(q)
  if (error) throw error
  return { posts, isLoading }
}

export function useToggleLike({ id, isLiked, uid }) {
  const { DisplayLoginMessage } = LoginMessage()
  const [isLoading, setLoading] = useState(false)

  async function toggleLike() {
    if (!uid) {
      DisplayLoginMessage()
      return
    }
    setLoading(true)
    const docRef = doc(db, 'posts', id)
    await updateDoc(docRef, {
      likes: isLiked === true ? arrayRemove(uid) : arrayUnion(uid),
    })

    setLoading(false)
  }

  return { toggleLike, isLoading }
}

export function useDeletePost(post) {
  const [isLoading, setLoading] = useState(false)
  const { pathname } = useLocation()
  const toast = useToast()
  const navigate = useNavigate()

  const { id, imgNameInStorage } = post

  async function deletePost() {
    const res = window.confirm(
      'Are you sure you want to delete this question ?'
    )

    if (pathname.startsWith('/protected/comments')) {
      navigate(DASHBOARD)
    }

    if (res) {
      setLoading(true)

      await deleteDoc(doc(db, 'posts', id))

      const imgRef = ref(storage, 'posts/' + imgNameInStorage)
      await deleteObject(imgRef)

      async function deleteComment(docRef) {
        deleteDoc(docRef)
      }

      const q = query(collection(db, 'comments'), where('postID', '==', id))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => deleteComment(doc.ref))

      toast({
        title: 'Post deleted',
        status: 'info',
        isClosable: true,
        position: 'top',
        duration: 5000,
      })

      setLoading(false)
    }
  }

  return { deletePost, isLoading }
}

export function usePost(id) {
  const q = doc(db, 'posts', id)
  const [post, isLoading, error] = useDocumentData(q)
  if (error) throw error

  return { post, isLoading }
}
