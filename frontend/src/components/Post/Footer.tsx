import { NextChakraLink } from "@/components/shared/NextChakraLink"
import { Button, Flex, HStack } from "@chakra-ui/core"
import { RiMessage2Fill } from "react-icons/ri"

const PostFooter: React.FC<{
  category?: string | null
  id?: string | null
  commentsCount?: number
}> = ({ category, id, commentsCount }): JSX.Element => {
  return (
    <Flex width="100%" fontSize="sm" fontWeight="500" p={1}>
      <Button size="sm" p={1} variant="ghost" color="#818384" borderRadius={2}>
        <HStack>
          <RiMessage2Fill />
          <NextChakraLink
            _hover={{ textTransform: "none" }}
            href="/r/[category]/[id]"
            as={`/r/${category}/${id}`}
          >
            {commentsCount} Comments
          </NextChakraLink>
        </HStack>
      </Button>
    </Flex>
  )
}

export default PostFooter
