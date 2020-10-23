import { Box, Button, Spinner } from "@chakra-ui/core"
import React, { memo } from "react"

type MoreCommentsProps = {
  loadMoreComments: () => void
  areMoreComments: boolean
  loadingMoreComments: boolean
}

const ShowMoreComments = ({
  loadMoreComments,
  areMoreComments,
  loadingMoreComments
}: MoreCommentsProps) => {
  if (areMoreComments) {
    return (
      <Box m={2}>
        <Button
          variant="outline"
          onClick={() => loadMoreComments()}
          disabled={loadingMoreComments}
        >
          {loadingMoreComments ? <Spinner /> : "Show More"}
        </Button>
      </Box>
    )
  } else {
    return null
  }
}

export default memo(ShowMoreComments)
