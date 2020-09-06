import { Stack } from '@chakra-ui/core'
import React from 'react'
import PostComponent from '.'
import { Post } from '../../generated/graphql'

const PostsFeed: React.FC<{ posts: any; onLoadMorePosts: any }> = ({
  posts
}) => {
  return (
    <Stack spacing={8}>
      {posts.map((post: Post) => (
        <PostComponent key={`post-${post.id}`} post={post} />
      ))}
    </Stack>
  )
}

export default PostsFeed
