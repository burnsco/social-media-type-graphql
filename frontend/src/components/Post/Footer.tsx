import { Box } from "@chakra-ui/core"
import { NextChakraLink } from "../shared/NextChakraLink"

const PostFooter: React.FC<{
  category?: string | null
  id?: string | null
  commentsCount?: number
}> = ({ category, id, commentsCount }) => {
  return (
    <Box mt={2} display="flex" width="100%">
      <Box borderRadius="sm" fontSize="12px" p={1} mb={1} color="gray.400">
        <NextChakraLink href="/r/[category]/[id]" as={`/r/${category}/${id}`}>
          {commentsCount} Comments
        </NextChakraLink>
      </Box>
    </Box>
  )
}

export default PostFooter
