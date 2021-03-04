import CommentsPageWithData from "@/components/common/Comment/Data"
import SubmitCommentForm from "@/components/common/Comment/Form"
import NewPost from "@/components/common/Post"
import Layout from "@/components/ui/Layout"
import { usePostQuery } from "@/generated/graphql"
import { Skeleton, Stack, VisuallyHidden } from "@chakra-ui/react"
import { useRouter } from "next/router"

export default function SinglePostPage() {
  const router = useRouter()

  const postId = router.query.id as string

  const { loading, data } = usePostQuery({ variables: { postId } })

  if (loading) return <VisuallyHidden>loading</VisuallyHidden>

  if (data && data.post) {
    return (
      <Layout title="Post">
        <Skeleton isLoaded={!loading}>
          <Stack spacing={4}>
            <NewPost
              key={`post-${data.post.id}-${data.post.title}`}
              post={data?.post}
            />

            <SubmitCommentForm />
            <CommentsPageWithData />
          </Stack>
        </Skeleton>
      </Layout>
    )
  }
  return null
}
