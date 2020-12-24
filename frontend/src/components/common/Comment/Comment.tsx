import { CommentQuery } from "@/generated/graphql"
import { timeDifferenceForDate } from "@/utils/index"
import { Box, Flex, IconButton, useColorModeValue } from "@chakra-ui/core"
import { useRouter } from "next/router"
import { BsArrowDown, BsArrowUp } from "react-icons/bs"

const CommentPage: React.FC<CommentQuery> = ({ comment }) => {
  const bg = useColorModeValue("white", "#202020")
  const router = useRouter()
  const votebg = useColorModeValue("gray.50", "#313131")

  return (
    <Box bg={bg} display="flex" minH="80px" width="100%">
      <Box bg={votebg}>
        <Flex
          width="45px"
          flexDir="column"
          alignItems="center"
          p="2"
          height="100%"
        >
          <IconButton
            onClick={() => console.log("upvote")}
            variant="ghost"
            color="current"
            aria-label="UpVote"
            icon={<BsArrowUp />}
          />

          <IconButton
            onClick={() => console.log("downvote")}
            variant="ghost"
            color="current"
            aria-label="DownVote"
            icon={<BsArrowDown />}
          />
        </Flex>
      </Box>

      {/* Comment Details Container */}
      <Box
        minH="80px"
        width="100%"
        display="flex"
        ml={3}
        flexDir="column"
        justifyContent="space-evenly"
      >
        <Flex fontSize="xs" display="flex" color="gray.300">
          <Box textDecoration="none" align="flex-start">
            Created by{" "}
            <Box
              onClick={() =>
                router.push(`/user/${comment?.createdBy?.username}`)
              }
              display="inline"
              color="gray.400"
              _hover={{
                textDecoration: "underline",
                cursor: "pointer"
              }}
            >
              {comment?.createdBy?.username}
            </Box>
            <Box display="inline" ml="2">
              {timeDifferenceForDate(Number(comment?.createdAt))}
            </Box>
          </Box>
        </Flex>

        <Box mt={1}>{comment?.body}</Box>
      </Box>
    </Box>
  )
}

export default CommentPage
