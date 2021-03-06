import { useNewMessageSubscription } from "@/generated/graphql"
import { Box, Heading } from "@chakra-ui/react"
import { useMeQuery } from "../../../generated/graphql"

export default function LatestMessage() {
  const { data, loading } = useMeQuery()

  const userId = data && data.me && data.me.id

  const { data: subData, loading: loadingSub } = useNewMessageSubscription({
    variables: { userId }
  })
  console.log(subData)
  return (
    <Box>
      <Heading>new comment: {!loading && subData?.newMessage.content}</Heading>
    </Box>
  )
}
