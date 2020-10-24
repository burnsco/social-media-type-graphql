import CommentsPageWithData from "@/components/Comment/Data"
import SubmitCommentForm from "@/components/Comment/Form"
import NewPost from "@/components/Post"
import { usePostLazyQuery } from "@/generated/graphql"
import { Skeleton, Stack, VisuallyHidden } from "@chakra-ui/core"
import { useRouter } from "next/router"
import React, { useEffect } from "react"

const PostAndCommentsPage: React.FC = () => {
  const router = useRouter()
  const postId = (router?.query?.id as string) ?? "1"

  const [getPost, { loading, data }] = usePostLazyQuery({
    variables: {
      postId: postId
    }
  })

  useEffect(() => {
    getPost()
  }, [getPost])

  console.log(router)

  if (loading) {
    return <VisuallyHidden>loading</VisuallyHidden>
  }

  if (data && data.post) {
    return (
      <Skeleton isLoaded={!loading}>
        <Stack spacing={4}>
          <NewPost
            key={`post-${data.post.id}-${data.post.title}`}
            post={data.post}
          />
          <SubmitCommentForm postId={postId} />
          <CommentsPageWithData postId={postId} />
        </Stack>
      </Skeleton>
    )
  }

  return null
}

export default PostAndCommentsPage
