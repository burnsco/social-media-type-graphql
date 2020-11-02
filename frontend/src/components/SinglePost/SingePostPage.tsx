import CommentsPageWithData from "@/components/Comment/Data"
import SubmitCommentForm from "@/components/Comment/Form"
import Layout from "@/components/Layout"
import NewPost from "@/components/Post"
import { usePostQuery } from "@/generated/graphql"
import { Skeleton, Stack } from "@chakra-ui/core"
import { useRouter } from "next/router"

const SinglePostPage: React.FC = () => {
  const router = useRouter()

  const postId = router.query.id as string

  const { loading, data } = usePostQuery({ variables: { postId } })

  return (
    <Layout title="Post">
      <Skeleton isLoaded={!loading || router.isFallback}>
        <Stack spacing={4}>
          <NewPost
            key={`post-${data?.post?.id}-${data?.post?.title}`}
            post={data?.post}
          />
          <SubmitCommentForm postId={postId} />
          <CommentsPageWithData postId={postId} />
        </Stack>
      </Skeleton>
    </Layout>
  )
}

export default SinglePostPage
