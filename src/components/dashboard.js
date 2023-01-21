import { usePosts } from '../hooks/Posts'
import NewPost from './post/NewPost'
import PostsLists from './post/postsLists'
import Loader from './Loader'

export default function Dashboard() {
  const { posts, isLoading } = usePosts()

  if (isLoading) return <Loader />

  return (
    <>
      <NewPost />
      <PostsLists posts={posts} />
    </>
  )
}
