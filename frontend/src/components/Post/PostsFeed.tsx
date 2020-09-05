import { Button, Stack } from '@chakra-ui/core'
import React from 'react'
import PostComponent from '.'
import { Post } from '../../generated/graphql'

const PostsFeed = (props:any) => {
  const { onLoadMore } = props
  return (
    <Stack spacing={8}>
      <Button onClick={() => onLoadMore}></Button>
      {props.data?.posts?.map((post: Post) => (
        <PostComponent key={`post-${post.id}`} post={post} />
      ))}
    </Stack>
  )
}

export default PostsFeed
