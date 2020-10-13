import CommentsPageWithData from "@/components/Comment/Data"
import SubmitCommentForm from "@/components/Comment/Form"
import NewPost from "@/components/Post"
import { usePostQuery } from "@/generated/graphql"
import { Box, Spinner, Stack } from "@chakra-ui/core"
import { useRouter } from "next/router"

const PostAndCommentsPage: React.FC = () => {
  const router = useRouter()
  const postId = (router?.query?.id as string) ?? 1

  const { loading, data, error } = usePostQuery({
    variables: {
      postId: postId
    }
  })

  if (router.isFallback) {
    return <Spinner />
  }

  if (error) return <div>error loading post</div>

  if (loading) return null

  const totalComments = data?.post?.totalComments?.count

  const ViewComments = () => {
    if ((totalComments && totalComments > 0) ?? true) {
      return <CommentsPageWithData postId={postId} />
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
        <SubmitCommentForm postId={postId} />
        <Box>Comments</Box>
        <ViewComments />
      </Stack>
    )
  }
  return <div>No post here.</div>
}

export default PostAndCommentsPage
