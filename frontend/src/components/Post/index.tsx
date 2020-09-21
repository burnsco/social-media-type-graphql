import { Box, Button, Text } from "@chakra-ui/core"
import { NextChakraLink } from "@components/shared/NextChakraLink"
import { PostQuery } from "@generated/graphql"
import { useRouter } from "next/router"
import * as React from "react"

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
        <Box>{post?.votes ?? `0`}</Box>
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
        <Box fontSize="sm" display="flex" color="gray.100">
          {/* Post Category */}
          <Box
            fontWeight="700"
            color="black"
            _hover={{
              textDecoration: "underline"
            }}
          >
            <NextChakraLink href="/">`/r/{post?.category.name}`</NextChakraLink>
          </Box>
          {/* Post created by */}
          <Box ml="2" textDecoration="none">
            Posted by <Text>{post?.author.username ?? "user"}</Text>
          </Box>
        </Box>

        {/* Post Title */}
        <Box mt={1} fontWeight="500">
          {post?.title ?? "404"}
        </Box>
        <Box mt={1}>(post body later)</Box>

        {/* Post Footer */}
        <Box mt={2} display="flex" width="100%">
          <Box borderRadius="sm" fontSize="md" p={1} mb={1} color="gray.200">
            {/* Post Comments */}
            <NextChakraLink href="/">
              `/user/{post?.author.username}`<Button>Icon Button</Button>
              {post?.comments?.length ?? 0}
            </NextChakraLink>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default NewPost
