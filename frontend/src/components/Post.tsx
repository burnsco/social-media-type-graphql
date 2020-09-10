import { Box, Flex, Heading } from '@chakra-ui/core'
import { PostQuery } from '@generated/graphql'
import * as React from 'react'

const Post: React.FC<PostQuery> = (props) => {
  const { post } = props
  {
    return (
      <Flex p={5} shadow='md' borderWidth='1px' minW='100%'>
        <Box>
          <Heading fontSize='xl'>Title - {post?.title ?? '404'}</Heading>
          <Heading fontSize='md'>
            Category - {post?.category.name ?? 'Not Found'}
          </Heading>
          <Heading fontSize='sm'>
            CreatedBy - {post?.author.username ?? 'Not Found'}
          </Heading>
        </Box>
      </Flex>
    )
  }
}

export default Post
