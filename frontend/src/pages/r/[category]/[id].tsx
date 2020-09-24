import { Box, Spinner, Stack } from "@chakra-ui/core"
import NewComment from "@components/Comment"
import SubmitCommentForm from "@components/Comment/Form"
import NewPost from "@components/Post"
import { usePostQuery } from "@generated/graphql"
import { useRouter } from "next/router"
import * as React from "react"

const PostAndCommentsPage: React.FC = () => {
  const router = useRouter()

  const { loading, data, error } = usePostQuery({
    variables: {
      postId: Number(router.query.id)
    }
  })

  if (router.isFallback) {
    return <Spinner />
  }
  if (error) return <div>error loading post</div>
  if (loading) return null

  const comments = data?.post?.comments ?? []

  const ViewComments = () => {
    if (comments.length > 0) {
      return (
        <Stack spacing={4}>
          {comments.map((comment, index) => (
            <NewComment
              key={`comment-${comment.id}-${index}`}
              comment={comment}
            />
          ))}
        </Stack>
      )
    }
    return <div>no comments yet</div>
  }

  if (data && data.post) {
    return (
      <Stack spacing={2}>
        <NewPost
          key={`post-${data.post.id}-${data.post.title}`}
          post={data.post}
        />
        <SubmitCommentForm post={data.post} />
        <Box>Comments</Box>
        <ViewComments />
      </Stack>
    )
  }
  return <div>No post here.</div>
}

export default PostAndCommentsPage
