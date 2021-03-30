import CommentsPageWithData from "@/components/common/Comment/Data"
import SubmitCommentForm from "@/components/common/Comment/Form"
import NewPost from "@/components/common/Post"
import Layout from "@/components/ui/Layout"
import { usePostQuery } from "@/generated/graphql"
import { Alert, Skeleton, Stack, VisuallyHidden } from "@chakra-ui/react"
import { useRouter } from "next/router"

export default function SinglePostPage() {
  const router = useRouter()

  const postId = router.query.id

  const { data, loading, error } = usePostQuery({
    variables: { postId: Number(postId) }
  })

  if (loading) return <VisuallyHidden>loading</VisuallyHidden>

  if (error) {
    return <Alert>Error!</Alert>
  }

  return (
    <Layout title="Post">
      <Skeleton isLoaded={!loading}>
        <Stack spacing={4}>
          {data && data.post ? (
            <NewPost
              key={`post-${data?.post.id}-${data?.post.title}`}
              post={data?.post}
            />
          ) : (
            <Alert>Post Not Found</Alert>
          )}

          <SubmitCommentForm />
          <CommentsPageWithData />
        </Stack>
      </Skeleton>
    </Layout>
  )
}
