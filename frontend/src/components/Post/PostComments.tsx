import { Box } from "@chakra-ui/core"
import React, { memo } from "react"
import CommentsPageWithData from "../Comment/Data"
import SubmitCommentForm from "../Comment/Form"

const PostComments: React.FC<{
  postId: string
  fullStyle?: boolean
}> = ({ postId, fullStyle = false }) => {
  if (fullStyle) {
    return (
      <>
        <Box pt="4em">
          <SubmitCommentForm postId={postId} />
        </Box>

        <Box pt="4em">
          <CommentsPageWithData postId={postId} />
        </Box>
      </>
    )
  }
  return null
}

export default memo(PostComments)
