import { Box, Button } from "@chakra-ui/core"
import { memo } from "react"

type MorePostsProps = {
  loadMorePosts: () => void
  areMorePosts: boolean
  loadingMorePosts: boolean
}

const ShowMorePosts = ({
  loadMorePosts,
  areMorePosts,
  loadingMorePosts
}: MorePostsProps) => {
  if (areMorePosts) {
    return (
      <Box m={2}>
        <Button
          colorScheme="blue"
          onClick={() => loadMorePosts()}
          disabled={loadingMorePosts}
        >
          {loadingMorePosts ? "Loading..." : "Show More"}
        </Button>
      </Box>
    )
  } else {
    return null
  }
}

export default memo(ShowMorePosts)
