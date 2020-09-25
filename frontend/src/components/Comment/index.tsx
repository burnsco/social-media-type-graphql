import { Box, Flex, IconButton, Skeleton } from "@chakra-ui/core"
import { useCommentsQuery } from "@generated/graphql"
import { timeDifferenceForDate } from "@utils/timeDifferenceForDate"
import { useRouter } from "next/router"
import * as React from "react"
import { BsArrowDown, BsArrowUp } from "react-icons/bs"

const NewComment: React.FC<{ postId: string }> = ({ postId }) => {
  const { data, loading, error } = useCommentsQuery({
    variables: { postId: postId }
  })
  const router = useRouter()

  return (
    // Container
    <Skeleton isLoaded={!loading}>
      {data?.comments?.map((comment, index) => {
        return (
          <Box
            key={`comment-${comment.body}-${index}`}
            background="#fff"
            display="flex"
            minH="100px"
            width="100%"
          >
            {/* VoteBoxContainer */}
            <Box mr={1}>
              <Flex
                width="45px"
                flexDir="column"
                alignItems="center"
                p="2"
                height="100%"
                borderRight="1px solid #ebedf0"
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
              minH="100px"
              width="100%"
              p={2}
              display="flex"
              flexDir="column"
              justifyContent="space-evenly"
            >
              <Box fontSize="12px" display="flex" color="gray.300">
                {/* Post created by */}
                <Box textDecoration="none">
                  Posted by{" "}
                  <Box
                    onClick={() =>
                      router.push(`/user/${comment?.createdBy.username}`)
                    }
                    display="inline"
                    color="gray.400"
                    _hover={{
                      textDecoration: "underline",
                      cursor: "pointer"
                    }}
                  >
                    {comment?.createdBy.username ?? "user"}
                  </Box>
                  <Box display="inline" ml="2">
                    {timeDifferenceForDate(Number(comment?.createdAt))}
                  </Box>
                </Box>
              </Box>

              <Box mt={1}>{comment?.body ?? null}</Box>
            </Box>
          </Box>
        )
      })}
    </Skeleton>
  )
}

export default NewComment
