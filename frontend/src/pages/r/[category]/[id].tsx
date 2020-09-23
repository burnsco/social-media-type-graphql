import { Box, Button, Spinner, Stack, Textarea } from "@chakra-ui/core"
import NewComment from "@components/Comment"
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

  const viewComments = () => {
    if (comments.length > 0) {
      return (
        <ul>
          {comments.map((comment, index) => (
            <NewComment key={`comment-${comment.id}-${index}`} {...comment} />
          ))}
        </ul>
      )
    }
  }
  if (data && data.post) {
    return (
      <Box>
        <Stack spacing={2}>
          <NewPost
            key={`post-${data.post.id}-${data.post.title}`}
            post={data.post}
          />
          <Textarea placeholder="Here is a sample placeholder" size="sm" />
          <Button>Submit</Button>
          <Box>Comments</Box>
          {viewComments}
        </Stack>
      </Box>
    )
  }
  return <div>No post here.</div>
}

export default PostAndCommentsPage
