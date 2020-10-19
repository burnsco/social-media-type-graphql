import NewPost from "@/components/Post"
import { usePostQuery } from "@/generated/graphql"
import { Stack } from "@chakra-ui/core"
import { useRouter } from "next/router"

const PostAndCommentsPage: React.FC = () => {
  const router = useRouter()
  const postId = (router?.query?.id as string) ?? 1

  const { loading, data, error } = usePostQuery({
    variables: {
      postId: postId
    }
  })

  if (error) return <div>error loading post</div>
  if (loading) return null

  const ViewPost: React.FC<{ postId: string }> = ({ postId }) => {
    if (data && data.post) {
      return (
        <NewPost
          fullStyle
          postId={postId}
          key={`post-${data.post.id}-${data.post.title}`}
          post={data.post}
        />
      )
    }
    return <div>Post Not Found.</div>
  }

  return (
    <Stack spacing={2}>
      <ViewPost postId={postId} />
    </Stack>
  )
}

export default PostAndCommentsPage
