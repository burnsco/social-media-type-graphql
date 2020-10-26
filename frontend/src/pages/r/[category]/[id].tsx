import CommentsPageWithData from "@/components/Comment/Data"
import SubmitCommentForm from "@/components/Comment/Form"
import NewPost from "@/components/Post"
import SEO from "@/components/shared/seo"
import { usePostQuery } from "@/generated/graphql"
import { Skeleton, Stack } from "@chakra-ui/core"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

const PostAndCommentsPage: React.FC = () => {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const postId = (router?.query?.id as string) ?? "1"
  useEffect(() => {
    setIsMounted(true)
  }, [isMounted])

  const { loading, data } = usePostQuery({
    variables: {
      postId: postId
    }
  })

  console.log(router)

  if (loading) {
    return <div>loading...</div>
  }
  console.log(data)
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
