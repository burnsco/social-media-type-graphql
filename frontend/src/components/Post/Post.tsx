import React from 'react'
import { Box, Heading, StackDivider, Text, VStack } from '@chakra-ui/core'
import { Post } from '../../generated/graphql'

const PostComponent: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <Box m="8">
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={8}
        align="stretch"
      >
        <Box p={5} shadow="md" borderWidth="1px">
          <Heading fontSize="xl">{post.title}</Heading>
          <Text>{post.category.name}</Text>
          <Text>{post.author.username}</Text>
        </Box>
      </VStack>
    </Box>
  )
}

export default PostComponent
