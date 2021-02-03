import { Box, Button, Flex, HStack } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { RiMessage2Fill } from "react-icons/ri"

const PostFooter: React.FC<{
  category?: string | null
  id?: string | null
  commentsCount?: number
}> = ({ category, id, commentsCount }): JSX.Element => {
  const router = useRouter()
  return (
    <Flex width="100%" fontSize="sm" fontWeight="500" p={1}>
      <Button size="sm" p={1} variant="ghost" color="#818384" borderRadius={2}>
        <HStack>
          <RiMessage2Fill />
          <Box
            _hover={{ textTransform: "none" }}
            onClick={() => router.push(`/r/${category}/${id}`)}
          >
            {commentsCount} Comments
          </Box>
        </HStack>
      </Button>
    </Flex>
  )
}

export default PostFooter
