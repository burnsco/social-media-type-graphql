import { NextChakraLink } from "@/components/shared/NextChakraLink"
import { Box } from "@chakra-ui/core"

type PostCategoryProps = {
  category?: string | null
}

const PostCategory = (props: PostCategoryProps): JSX.Element => (
  <Box
    fontWeight="600"
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
