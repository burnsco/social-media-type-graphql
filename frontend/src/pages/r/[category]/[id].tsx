import { Box, Spinner, Stack } from "@chakra-ui/core"
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

  if (data?.post) {
    const { post } = data
    return (
      <Box>
        <Stack spacing={8}>
          <NewPost key={`post-${post.id}-${post.title}`} post={post} />
        </Stack>
      </Box>
    )
  }
  return <div>No post here.</div>
}

export default PostAndCommentsPage
