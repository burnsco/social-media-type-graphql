import { Box, Flex, Heading } from "@chakra-ui/core"
import { SinglePostQuery } from "@generated/graphql"
import * as React from "react"

const Post: React.FC<SinglePostQuery> = (props) => {
  const post = props.post

  return !post ? null : (
    <Flex p={5} shadow="md" borderWidth="1px" minW="100%">
      <Box>
        <Heading fontSize="xl">Title - {post.title}</Heading>
        <Heading fontSize="md">Category - {post.category.name}</Heading>
        <Heading fontSize="sm">CreatedBy - {post.author.username}</Heading>
      </Box>
    </Flex>
  )
}

export default Post
