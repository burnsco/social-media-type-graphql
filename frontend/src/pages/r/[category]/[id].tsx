import CommentsPageWithData from "@/components/Comment/Data"
import SubmitCommentForm from "@/components/Comment/Form"
import NewPost from "@/components/Post"
import { usePostQuery } from "@/generated/graphql"
import { Box, Stack } from "@chakra-ui/core"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const PostAndCommentsPage: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [isMounted])

  const router = useRouter()
  const postId = (router?.query?.id as string) ?? 1

  const { loading, data, error } = usePostQuery({
    variables: {
      postId: postId
    }
  })

  if (error) return <div>error loading post</div>
  if (loading) return null

  const ViewPost = () => {
    if (data && data.post) {
      return (
        <NewPost
          key={`post-${data.post.id}-${data.post.title}`}
          post={data.post}
        />
      )
    }
    return <div>Post Not Found.</div>
  }

  if (isMounted) {
    return (
      <Stack spacing={2}>
        <ViewPost />
        <SubmitCommentForm postId={postId} />
        <Box>Comments</Box>
        <CommentsPageWithData postId={postId} />
      </Stack>
    )
  }
  return null
}

export default PostAndCommentsPage
