import { Box, Flex, Heading, Text } from '@chakra-ui/core'
import React from 'react'
import { SinglePostQuery } from '../../generated/graphql'

const PostComponent: React.FC<SinglePostQuery> = data => {
  const { post } = data
  return (
    <Flex p={5} shadow="md" borderWidth="1px" minW="100%">
      <Box>
        <Heading fontSize="xl">Title - {post?.title}</Heading>
        <Text>Category - {post?.category?.name}</Text>
        <Text>CreatedBy - {post?.author?.username}</Text>
      </Box>
    </Flex>
  )
}

export default PostComponent
