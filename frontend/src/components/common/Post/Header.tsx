import { DeletePostDialog } from "@/components/common/DeletePostDialog"
import { NextChakraLink } from "@/components/common/index"
import { timeDifferenceForDate } from "@/utils/index"
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Spacer,
  useColorModeValue
} from "@chakra-ui/core"
import { useRouter } from "next/router"
import { FiEdit } from "react-icons/fi"

const PostHeader: React.FC<{
  category?: string | null
  author?: string | null
  createdAt?: string | null
  postId?: string | null | undefined
}> = ({ category, author, createdAt, postId }) => {
  const fontColor = useColorModeValue("#1A1A1B", "gray.200")
  const router = useRouter()
  return (
    <HStack fontSize="sm" my={1} color={fontColor} w="full">
      <HStack>
        <Box
          fontWeight="600"
          color="orange.500"
          _hover={{
            textDecoration: "underline"
          }}
        >
          <Box
            _hover={{
              textDecoration: "underline",
              cursor: "pointer"
            }}
            onClick={() => router.push(`/r/${category}`)}
          >
            /r/{category}
          </Box>
        </Box>
        <Box ml="2" textDecoration="none">
          Posted by{" "}
          <Box
            onClick={() => router.push(`/user/${author}`)}
            fontWeight="500"
            display="inline"
            color="gray.400"
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
      </HStack>
      <Spacer />
      {postId && (
        <Flex mr={1}>
          <NextChakraLink href="/post/edit/[id]" as={`/post/edit/${postId}}`}>
            <IconButton
              mr={2}
              size="xs"
              aria-label="Edit Post"
              icon={<FiEdit />}
            />
          </NextChakraLink>

          <DeletePostDialog postId={postId} />
        </Flex>
      )}
    </HStack>
  )
}

export default PostHeader
