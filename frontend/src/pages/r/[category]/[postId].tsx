import { Box, Spinner, Stack } from "@chakra-ui/core"
import NewPost from "@components/Post"
import { usePostQuery } from "@generated/graphql"
import { useRouter } from "next/router"
import * as React from "react"

const PostAndCommentsPage: React.FC<{ postId: number }> = ({ postId }) => {
  const router = useRouter()
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [isMounted])

  const { loading, data, error, fetchMore, networkStatus } = usePostQuery({
    variables: {
      postId: postId
    },
    skip: !isMounted
  })

  if (router.isFallback) {
    return <Spinner />
  }

  if (error) return <div>error loading posts</div>

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
  return <div>No posts here.</div>
}

export default PostAndCommentsPage
