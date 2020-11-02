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
  return (
    <Box m={2}>
      {areMorePosts && (
        <Button
          colorScheme="blue"
          onClick={() => loadMorePosts()}
          disabled={loadingMorePosts}
        >
          {loadingMorePosts ? "Loading..." : "Show More"}
        </Button>
      )}
    </Box>
  )
}

export default memo(ShowMorePosts)
