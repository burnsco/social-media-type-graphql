import { Box, Flex, Heading, StackDivider, Text, VStack } from '@chakra-ui/core'
import React from 'react'
import { Post } from '../../generated/graphql'

const PostComponent: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <Flex border="solid" borderRadius="sm" borderColor="gray.200" m="8">
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={8}
        minW="100%"
        align="stretch"
      >
        <Box p={5} shadow="md" borderWidth="1px">
          <Heading fontSize="xl">Title - {post?.title}</Heading>
          <Text>Category - {post?.category?.name}</Text>
          <Text>CreatedBy - {post?.author?.username}</Text>
        </Box>
      </VStack>
    </Flex>
  )
}

export default PostComponent
