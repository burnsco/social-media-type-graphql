import { Button, Stack } from '@chakra-ui/core'
import React from 'react'
import PostComponent from '.'
import { Post } from '../../generated/graphql'

const PostsFeed = (props: any) => {
  const {
    posts,
    loadingMorePosts,
    onLoadMorePosts,
    areMorePosts,
    loading
  } = props
  console.log('are more posts?')
  console.log(areMorePosts)
  return (
    <Stack spacing={8}>
      {posts.map((post:Post, index: number) => (
        <PostComponent key={`post-${post.id}-${index}`} post={post} />
      ))}
      {areMorePosts && (
        <Button isLoading={loading} onClick={() => onLoadMorePosts()}>
          {loadingMorePosts ? 'Loading...' : 'Show More'}
        </Button>
      )}
    </Stack>
  )
}

export default PostsFeed
