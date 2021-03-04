import { DeletePostDialog } from "@/components/common/DeletePostDialog"
import { timeDifferenceForDate } from "@/utils/index"
import { Box, Flex, HStack, Spacer, useColorModeValue } from "@chakra-ui/react"
import { useRouter } from "next/router"

const PostHeader: React.FC<{
  category?: string | null
  author?: string | null
  createdAt?: string | null
  updatedAt?: string | null
  postId?: string | null | undefined
}> = ({ category, author, createdAt, postId, updatedAt }) => {
  const fontColor = useColorModeValue("#1A1A1B", "gray.200")
  const router = useRouter()

  // #TODO figure out how to get the proper updatedAt value so you can
  // have 'updated by ${user} @ time
  // current does not work when sending updatedAt

  const renderPostCreatedOrEdited = () => (
    <Box ml="2" textDecoration="none">
      Posted by
      <Box
        ml="1.5"
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
        {timeDifferenceForDate(createdAt)}
      </Box>
    </Box>
  )

  const renderPostCategoryLink = () => (
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
  )

  return (
    <HStack fontSize="sm" my={1} color={fontColor} w="full">
      <HStack>
        {renderPostCategoryLink()}
        {renderPostCreatedOrEdited()}
      </HStack>
      <Spacer />

      <Flex mr={1}>
        <DeletePostDialog postId={postId} />
      </Flex>
    </HStack>
  )
}

export default PostHeader
