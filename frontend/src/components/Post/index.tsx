import { Box, Flex, Heading, Text } from '@chakra-ui/core'
import React from 'react'
import { Post } from '../../generated/graphql'

const PostComponent: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <Flex p={5} shadow="md" borderWidth="1px" minW="100%">
      <Box >
        <Heading fontSize="xl">Title - {post?.title}</Heading>
        <Text>Category - {post?.category?.name}</Text>
        <Text>CreatedBy - {post?.author?.username}</Text>
      </Box>
    </Flex>
  )
}

export default PostComponent
