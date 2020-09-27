import { Box, Flex, Heading, IconButton } from "@chakra-ui/core"
import Link from "next/link"
import { useRouter } from "next/router"
import * as React from "react"
import { ImArrowDown, ImArrowUp } from "react-icons/im"
import { PostQuery } from "../../generated/graphql"
import { timeDifferenceForDate } from "../../utils/timeDifferenceForDate"
import { NextChakraLink } from "../shared/NextChakraLink"

const NewPost: React.FC<PostQuery> = props => {
  const router = useRouter()
  const { post } = props

  return (
    // Container
    <Box
      border="1px"
      borderColor="gray.200"
      border-radius="5px"
      display="flex"
      mb="20px"
      minH="100px"
      width="100%"
      _hover={{
        borderColor: "gray.300"
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
            icon={<ImArrowUp />}
          />
          <Box>{post?.totalVotes?.count ?? 0}</Box>
          <IconButton
            onClick={() => console.log("downvote")}
            variant="ghost"
            color="current"
            aria-label="DownVote"
            icon={<ImArrowDown />}
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
            color="gray.600"
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
          <Heading fontSize="xl">{post?.title ?? null}</Heading>
        </Box>
        <Box mt={1}>{post?.text ?? null}</Box>

        <Box mt={1}>
          <Link href={`https://${post?.link}`}>{post?.link ?? null}</Link>
        </Box>

        {/* Post Footer */}
        <Box mt={2} display="flex" width="100%">
          <Box borderRadius="sm" fontSize="12px" p={1} mb={1} color="gray.400">
            {/* Post Comments */}

            <NextChakraLink
              href="/r/[category]/[id]"
              as={`/r/${post?.category.name}/${post?.id}`}
            >
              {post?.totalComments?.count ?? 0} Comments
            </NextChakraLink>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default NewPost
