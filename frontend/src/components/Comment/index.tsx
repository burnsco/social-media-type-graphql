import { CommentQuery } from "@/generated/graphql"
import { timeDifferenceForDate } from "@/utils/timeDifferenceForDate"
import { Box, Flex, IconButton, useColorModeValue } from "@chakra-ui/core"
import { useRouter } from "next/router"
import { BsArrowDown, BsArrowUp } from "react-icons/bs"

const CommentPage: React.FC<CommentQuery> = ({ comment }) => {
  const bg = useColorModeValue("white", "#202020")
  const router = useRouter()
  const votebg = useColorModeValue("gray.50", "#313131")
  if (comment) {
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

        {/* Post Details Conatiner */}
        <Box
          minH="80px"
          width="100%"
          display="flex"
          ml={3}
          flexDir="column"
          justifyContent="space-evenly"
        >
          <Flex fontSize="xs" display="flex" color="gray.300">
            {/* Post created by */}
            <Box textDecoration="none" align="flex-start">
              Posted by{" "}
              <Box
                onClick={() =>
                  router.push(`/user/${comment.createdBy.username}`)
                }
                display="inline"
                color="gray.400"
                _hover={{
                  textDecoration: "underline",
                  cursor: "pointer"
                }}
              >
                {comment.createdBy.username ?? "user"}
              </Box>
              <Box display="inline" ml="2">
                {timeDifferenceForDate(Number(comment.createdAt))}
              </Box>
            </Box>
          </Flex>

          <Box mt={1}>{comment.body}</Box>
        </Box>
      </Box>
    )
  }
  return null
}

export default CommentPage
