import { useQuery } from "@apollo/client"
import { Skeleton, Stack, Text } from "@chakra-ui/react"
import { useEffect } from "react"
import { Comment, useNewCommentsSubscription } from "../../../generated/graphql"
import { COMMENTS_FOR_POST_QUERY } from "../../../types/unTypedGraphql/comments-for-post"
import { NEW_COMMENTS_SUBSCRIPTION } from "../../../types/unTypedGraphql/new-comments-for-post"
import CommentPage from "./Comment"

const CommentsPageWithData: React.FC<{ postId: string }> = ({ postId }) => {
  const { subscribeToMore, data, loading, error } = useQuery(
    COMMENTS_FOR_POST_QUERY,
    {
      variables: { postId }
    }
  )

  useEffect(() => {
    return () => {
      subscribeToMore({
        document: NEW_COMMENTS_SUBSCRIPTION,
        variables: { postId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev
          const newComment = subscriptionData.data.newComments
          return {
            ...prev,
            post: {
              comments: [newComment, ...prev.post.comments]
            }
          }
        }
      })
    }
  }, [])

  console.log("commentsforPostQuery")
  console.log(data)

  const { data: newCommentsData } = useNewCommentsSubscription({
    variables: { postId }
  })

  console.log(`newCommentsData`)
  console.log(newCommentsData)

  console.log("subToMore")
  console.log(subscribeToMore)

  return (
    <Skeleton isLoaded={!loading || !error}>
      {data &&
      data.post &&
      data.post.comments &&
      data.post.comments.length > 0 ? (
        <Stack>
          {data.post.comments.map(
            (comment: Comment): JSX.Element => (
              <CommentPage key={`comment-${comment.id}`} comment={comment} />
            )
          )}
        </Stack>
      ) : (
        <Text>No comments yet</Text>
      )}
    </Skeleton>
  )
}

export default CommentsPageWithData
