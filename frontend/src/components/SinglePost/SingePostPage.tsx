import CommentsPageWithData from "@/components/Comment/Data"
import SubmitCommentForm from "@/components/Comment/Form"
import Layout from "@/components/Layout"
import NewPost from "@/components/Post"
import { usePostQuery } from "@/generated/graphql"
import { Stack, VisuallyHidden } from "@chakra-ui/core"
import { useRouter } from "next/router"

const SinglePostPage: React.FC = () => {
  const router = useRouter()

  const postId = router.query.id as string

  const { loading, data } = usePostQuery({ variables: { postId } })

  if (loading) return <VisuallyHidden>loading</VisuallyHidden>

  return (
    <Layout title="Post">
      <Stack spacing={4}>
        <NewPost
          key={`post-${data?.post?.id}-${data?.post?.title}`}
          post={data?.post}
        />
        <SubmitCommentForm postId={postId} />
        <CommentsPageWithData comments={data?.post?.comments} />
      </Stack>
    </Layout>
  )
}

export default SinglePostPage
