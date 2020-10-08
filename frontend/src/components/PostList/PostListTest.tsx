import { usePostsQuery } from "@/generated/graphql"
import { allPostsQueryVars } from "@/types/post"
import * as React from "react"
import NewPost from "../Post"

const PostListTest = () => {
  const { loading, data, error } = usePostsQuery({
    variables: allPostsQueryVars
  })

  if (error) return <div>error loading posts</div>

  if (loading) return <div>...loading</div>

  const allPosts = data?.posts ?? []

  return (
    <ul>
      {allPosts.map((post, index) => (
        <NewPost key={`post-${post.id}-${index}`} post={post} />
      ))}
    </ul>
  )
}

export default PostListTest
