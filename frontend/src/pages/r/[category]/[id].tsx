import CommentsPageWithData from "@/components/Comment/Data"
import SubmitCommentForm from "@/components/Comment/Form"
import NewPost from "@/components/Post"
import { PostNotFound } from "@/components/shared/PostNotFound"
import { usePostLazyQuery } from "@/generated/graphql"
import { Box, Skeleton, Stack } from "@chakra-ui/core"
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

  if (data && data.post) {
    return (
      <Skeleton isLoaded={!loading}>
        <Stack spacing={2}>
          <NewPost
            key={`post-${data.post.id}-${data.post.title}`}
            post={data.post}
          />
          <SubmitCommentForm postId={postId} />
          <Box>Comments</Box>
          <CommentsPageWithData postId={postId} />
        </Stack>
      </Skeleton>
    )
  } else {
    return <PostNotFound />
  }
}

export default PostAndCommentsPage
