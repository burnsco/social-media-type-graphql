import { Box, Flex, Heading, IconButton } from "@chakra-ui/core"
import { NextChakraLink } from "@components/shared/NextChakraLink"
import { PostQuery } from "@generated/graphql"
import { timeDifferenceForDate } from "@utils/timeDifferenceForDate"
import { useRouter } from "next/router"
import * as React from "react"
import { BsArrowDown, BsArrowUp } from "react-icons/bs"

const NewPost: React.FC<PostQuery> = props => {
  const router = useRouter()
  const { post } = props

  return (
    // Container
    <Box
      border="1px solid #ebedf0"
      background="#fff"
      border-radius="5px"
      display="flex"
      mb="20px"
      minH="100px"
      width="100%"
      _hover={{
        border: "1px solid #ced1db"
      }}
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
          <Box>{post?.votes?.length ?? 0}</Box>
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
        mt={1}
        minH="100px"
        px={1}
        width="100%"
        display="flex"
        flexDir="column"
        justifyContent="space-evenly"
      >
        {/* Post Details Header */}
        <Box fontSize="12px" display="flex" color="gray.300">
          {/* Post Category */}
          <Box
            fontWeight="700"
            color="black"
            _hover={{
              textDecoration: "underline"
            }}
          >
            <NextChakraLink
              href="/r/[category]"
              as={`/r/${post?.category.name}`}
            >
              /r/{post?.category.name}
            </NextChakraLink>
          </Box>
          {/* Post created by */}
          <Box ml="2" textDecoration="none">
            Posted by{" "}
            <Box
              onClick={() => router.push(`/user/${post?.author.username}`)}
              display="inline"
              color="gray.400"
              _hover={{
                textDecoration: "underline",
                cursor: "pointer"
              }}
            >
              {post?.author.username ?? "user"}
            </Box>
            <Box display="inline" ml="2">
              {timeDifferenceForDate(Number(post?.createdAt))}
            </Box>
          </Box>
        </Box>

        {/* Post Title */}
        <Box mt={1} fontWeight="500">
          <Heading fontSize="xl">{post?.title ?? "404"}</Heading>
        </Box>
        <Box mt={1}>{post?.text ?? null}</Box>

        {/* Post Footer */}
        <Box mt={2} display="flex" width="100%">
          <Box borderRadius="sm" fontSize="12px" p={1} mb={1} color="gray.200">
            {/* Post Comments */}

            <NextChakraLink
              href="/r/[category]/[id]"
              as={`/r/${post?.category.name}/${post?.id}`}
            >
              {" "}
              Comments {post?.comments?.length ?? 0}
            </NextChakraLink>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default NewPost
