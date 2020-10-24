import { Box } from "@chakra-ui/core"
import { NextChakraLink } from "../shared/NextChakraLink"

type PostCategoryProps = {
  category?: string | null
}

const PostCategory = (props: PostCategoryProps) => (
  <Box
    fontWeight="700"
    color="orange.500"
    _hover={{
      textDecoration: "underline"
    }}
  >
    <NextChakraLink href="/r/[category]" as={`/r/${props.category}`}>
      /r/{props.category}
    </NextChakraLink>
  </Box>
)

export default PostCategory
