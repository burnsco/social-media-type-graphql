import CommentsPageWithData from "@/components/Comment/Data"
import SubmitCommentForm from "@/components/Comment/Form"
import NewPost from "@/components/Post"
import SEO from "@/components/shared/seo"
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
    const { name: category } = data.post.category
    const { id, title } = data.post
    return (
      <>
        <SEO title={category} description={title} />
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
