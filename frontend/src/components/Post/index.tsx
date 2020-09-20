import { Box, Button, Text } from "@chakra-ui/core"
import { NextChakraLink } from "@components/shared/NextChakraLink"
import { useRouter } from "next/router"
import * as React from "react"

const Post = () => {
  const router = useRouter()

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
        <Box>put votes score and arrows here</Box>
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
            <NextChakraLink href="/">link to subreddit</NextChakraLink>
          </Box>
          {/* Post created by */}
          <Box ml="2" textDecoration="none">
            Posted by <Text>username</Text>
          </Box>
        </Box>

        {/* Post Title */}
        <Box mt={1} fontWeight="500">
          post title
        </Box>
        <Box mt={1}>Post Text</Box>

        {/* Post Footer */}
        <Box mt={2} display="flex" width="100%">
          <Box borderRadius="sm" fontSize="md" p={1} mb={1} color="gray.200">
            {/* Post Comments */}
            <NextChakraLink href="/">
              link to user profile
              <Button>Icon Button</Button>
              (comments length)
            </NextChakraLink>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Post
