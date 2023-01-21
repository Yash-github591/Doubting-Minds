import { useComments } from 'hooks/comments'
import Comment from './comment'

export default function CommentList({ post }) {
  const { id } = post
  const { comments, isLoading } = useComments(id)

  if (isLoading) return ''

  return comments.map((comment) => (
    <Comment key={comment.id} comment={comment} />
  ))
}
