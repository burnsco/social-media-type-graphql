import { CommentsQuery } from "@/generated/graphql"
import { Stack, Text } from "@chakra-ui/core"
import CommentPage from "./index"

const CommentsPageWithData: React.FC<CommentsQuery> = data => {
  if (data && data.comments) {
    return (
      <>
        {data.comments.length > 0 ? (
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
  return null
}

export default CommentsPageWithData
