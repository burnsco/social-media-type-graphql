import CommentsPageWithData from "@/components/Comment/Data"
import SubmitCommentForm from "@/components/Comment/Form"
import NewPost from "@/components/Post"
import { usePostQuery } from "@/generated/graphql"
import { Skeleton, Stack } from "@chakra-ui/core"
import { useRouter } from "next/router"

const PostAndCommentsPage: React.FC = () => {
  const router = useRouter()

  const postId = router.query.id as string

  const { loading, data, error } = usePostQuery({ variables: { postId } })

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>error loading post</div>
  }

  if (data && data.post) {
    const { name: category } = data.post.category
    const { id, title } = data.post
    return (
      <>
        <Skeleton isLoaded={!loading}>
          <Stack spacing={4}>
            <NewPost key={`post-${id}-${title}`} post={data.post} />
            <SubmitCommentForm postId={postId} />
            <CommentsPageWithData postId={postId} />
          </Stack>
        </Skeleton>
      </>
    )
  }

  return null
}

export default PostAndCommentsPage
