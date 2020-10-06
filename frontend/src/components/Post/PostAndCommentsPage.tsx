import { usePostQuery } from "@/generated/graphql"
import { timeDifferenceForDate } from "@/utils/timeDifferenceForDate"
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Spinner,
  useColorModeValue
} from "@chakra-ui/core"
import Link from "next/link"
import { useRouter } from "next/router"
import * as React from "react"
import { ImArrowDown, ImArrowUp } from "react-icons/im"
import CommentsPageWithData from "../Comment/Data"
import SubmitCommentForm from "../Comment/Form"
import { NextChakraLink } from "../shared/NextChakraLink"

const PostAndCommentsPage: React.FC = () => {
  const bg = useColorModeValue("white", "#1A1A1B")
  const router = useRouter()
  const postId = (router?.query?.id as string) ?? 1

  const { loading, data, error } = usePostQuery({
    variables: {
      postId: postId
    }
  })

  if (router.isFallback) {
    return <Spinner />
  }
  if (error) return <div>error loading post</div>
  if (loading) return null

  const totalComments = data?.post?.totalComments?.count

  const ViewComments = () => {
    if ((totalComments && totalComments > 0) ?? false) {
      return <CommentsPageWithData postId={postId} />
    }
    return <div>no comments yet</div>
  }

  if (data && data.post) {
    return (
      // Container
      <Box
        bg={bg}
        borderWidth="1px"
        rounded="md"
        overflow="hidden"
        display="flex"
        mb="20px"
        minH="100px"
        width="100%"
        _hover={{
          borderColor: "gray.500"
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
          >
            <IconButton
              onClick={() => console.log("upvote")}
              variant="ghost"
              color="current"
              aria-label="UpVote"
              icon={<ImArrowUp />}
            />
            <Box>{data?.post?.totalVotes?.count ?? 0}</Box>
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
                as={`/r/${data?.post?.category.name}`}
              >
                /r/{data?.post?.category.name}
              </NextChakraLink>
            </Box>
            {/* Post created by */}
            <Box ml="2" textDecoration="none">
              Posted by{" "}
              <Box
                onClick={() =>
                  router.push(`/user/${data?.post?.author.username}`)
                }
                display="inline"
                color="gray.400"
                _hover={{
                  textDecoration: "underline",
                  cursor: "pointer"
                }}
              >
                {data?.post?.author.username ?? "user"}
              </Box>
              <Box display="inline" ml="2">
                {timeDifferenceForDate(Number(data?.post?.createdAt))}
              </Box>
            </Box>
          </Box>

          {/* Post Title */}
          <Box mt={1} fontWeight="500">
            <Heading fontSize="xl">{data?.post?.title ?? null}</Heading>
          </Box>
          <Box mt={1}>{data?.post?.text ?? null}</Box>

          <Box mt={1}>
            <Link href={`https://${data?.post?.link}`}>
              {data?.post?.link ?? null}
            </Link>
          </Box>

          {/* Post Footer */}
          <Box mt={2} display="flex" width="100%">
            <Box
              borderRadius="sm"
              fontSize="12px"
              p={1}
              mb={1}
              color="gray.400"
            >
              {/* Post Comments */}

              <NextChakraLink
                href="/r/[category]/[id]"
                as={`/r/${data?.post?.category.name}/${data?.post?.id}`}
              >
                {data?.post?.totalComments?.count ?? 0} Comments
              </NextChakraLink>
            </Box>
          </Box>
        </Box>
        <SubmitCommentForm postId={postId} />
        <Box>Comments</Box>
        <ViewComments />
      </Box>
    )
  }
  return <div>No posts here.</div>
}

export default PostAndCommentsPage
