import { useToast } from '@chakra-ui/react'
import {
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import { useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db, storage } from 'lib/firebase'

export function useAddComment({ postID, uid }) {
  const [isLoading, setLoading] = useState(false)
  const toast = useToast()

  async function addComment({
    text,
    id,
    img,
    imgNameInStorage,
    setImgNameInStorage,
  }) {
    setLoading(true)
    const date = Date.now()
    const docRef = doc(db, 'comments', id)
    await setDoc(docRef, {
      img,
      imgNameInStorage,
      text,
      id,
      postID,
      uid,
      date,
    })

    toast({
      title: 'Answer added',
      status: 'success',
      isClosable: 'true',
      duration: 5000,
    })
    setImgNameInStorage(null)
    setLoading(false)
  }
  return { addComment, isLoading }
}

export function useComments(postID) {
  const q = query(
    collection(db, 'comments'),
    where('postID', '==', postID),
    orderBy('date', 'asc')
  )
  const [comments, isLoading, error] = useCollectionData(q)

  if (error) throw error

  return { comments, isLoading }
}

export function useDeleteComment(comment) {
  const [isLoading, setLoading] = useState(false)
  const { id, imgNameInStorage } = comment
  const toast = useToast()

  async function deleteComment() {
    const res = window.confirm('Are you sure you want to delete this answer ?')

    if (res) {
      setLoading(true)
      const docRef = doc(db, 'comments', id)
      const imgRef = ref(storage, 'comments/' + imgNameInStorage)
      await deleteDoc(docRef)
      await deleteObject(imgRef)
      toast({
        title: 'Answer deleted',
        status: 'info',
        isClosable: true,
        duration: 5000,
      })
      setLoading(false)
    }
  }

  return { deleteComment, isLoading }
}
