import { CommentsQuery } from "@/generated/graphql"
import { Stack, Text } from "@chakra-ui/react"
import CommentPage from "./index"

const CommentsPageWithData: React.FC<CommentsQuery> = data => {
  return (
    <>
      {data && data.comments && data.comments.length > 0 ? (
        <Stack>
          {data.comments.map(
            (comment, index): JSX.Element => (
              <CommentPage
                key={`comment-${comment.id}-${index}`}
                comment={comment}
              />
            )
          )}
        </Stack>
      ) : (
        <Text>No comments yet</Text>
      )}
    </>
  )
}

export default CommentsPageWithData
