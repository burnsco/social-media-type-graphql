import { timeDifferenceForDate } from "@/utils/timeDifferenceForDate"
import { Box, Flex } from "@chakra-ui/core"
import { useRouter } from "next/router"
import PostCategory from "./Category"

const PostHeader: React.FC<{
  category?: string | null
  author?: string | null
  createdAt?: string | null
}> = ({ category, author, createdAt }) => {
  const router = useRouter()
  return (
    <Flex fontSize="xs" color="gray.400">
      <PostCategory category={category} />

      <Box ml="2" textDecoration="none">
        Posted by{" "}
        <Box
          onClick={() => router.push(`/user/${author}`)}
          fontWeight="500"
          display="inline"
          color="gray.500"
          _hover={{
            textDecoration: "underline",
            cursor: "pointer"
          }}
        >
          {author}
        </Box>
        <Box display="inline" ml="2">
          {timeDifferenceForDate(Number(createdAt))}
        </Box>
      </Box>
    </Flex>
  )
}

export default PostHeader
