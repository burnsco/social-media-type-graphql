import CommentsPageWithData from "@/components/common/Comment/Data"
import SubmitCommentForm from "@/components/common/Comment/Form"
import NewPost from "@/components/common/Post"
import Layout from "@/components/ui/Layout"
import { usePostLazyQuery } from "@/generated/graphql"
import { Skeleton, Stack, VisuallyHidden } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function SinglePostPage() {
  const router = useRouter()

  const postId = Number(router.query.id)

  const [fetchPost, { loading, data }] = usePostLazyQuery({
    variables: { postId }
  })
  useEffect(() => fetchPost(), [fetchPost])

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
