import { useCommentsQuery } from "@/generated/graphql"
import { NetworkStatus } from "@apollo/client"
import {
  Box,
  Skeleton,
  Spinner,
  Stack,
  Text,
  useColorModeValue
} from "@chakra-ui/core"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { ImSpinner } from "react-icons/im"
import CommentPage from "./index"
import ShowMoreComments from "./ShowMore"

const CommentsPageWithData: React.FC<{ postId: string }> = ({ postId }) => {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const bg = useColorModeValue("white", "#202020")

  useEffect(() => {
    setIsMounted(true)
  }, [isMounted])

  const { loading, data, error, fetchMore, networkStatus } = useCommentsQuery({
    variables: {
      postId: postId,
      skip: 0,
      first: 2
    },
    notifyOnNetworkStatusChange: true,
    skip: !isMounted
  })

  const loadingMoreComments = networkStatus === NetworkStatus.fetchMore

  if (router.isFallback) {
    return <Spinner />
  }
  if (error) return <div>error loading comments</div>
  if (loading && !loadingMoreComments) return <ImSpinner />

  const comments = data?.comments ?? []
  const areMoreComments = (comments?.length ?? 1) < (comments?.length ?? 0)

  const loadMoreComments = () => {
    fetchMore({
      variables: {
        skip: data?.comments?.length ?? 0
      }
    })
  }

  const ViewComments = () => {
    if (comments.length > 0) {
      return (
        <Box>
          <Stack>
            {comments.map((comment, index) => (
              <CommentPage
                key={`comment-${comment.id}-${index}`}
                comment={comment}
              />
            ))}
          </Stack>
        </Box>
      )
    }
    return <Text>No comments yet.</Text>
  }

  return (
    <Box>
      <Skeleton isLoaded={!loading}>
        <ViewComments />
        <ShowMoreComments
          loadMoreComments={loadMoreComments}
          areMoreComments={areMoreComments}
          loadingMoreComments={loadingMoreComments}
        />
      </Skeleton>
    </Box>
  )
}

export default CommentsPageWithData
