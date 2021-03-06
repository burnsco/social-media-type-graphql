import { useNewCommentsSubscription } from "@/generated/graphql"
import { Box, Heading } from "@chakra-ui/react"
import { useRouter } from "next/router"

export default function LatestComment() {
  const router = useRouter()
  const postId = router.query.id as string

  const { data: subData, loading } = useNewCommentsSubscription({
    variables: { postId }
  })
  console.log(subData)
  return (
    <Box>
      <Heading>new comment: {!loading && subData?.newComments.body}</Heading>
    </Box>
  )
}
