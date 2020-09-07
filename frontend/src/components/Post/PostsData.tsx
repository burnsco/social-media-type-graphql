import { Spinner } from '@chakra-ui/core'
import React from 'react'
import { useAllPaginatedPostsQuery } from '../../generated/graphql'
import PostsFeed from './PostsFeed'

const PostsPageWithData = () => {
  const { loading, error, data, fetchMore } = useAllPaginatedPostsQuery({
    variables: {
      offset: 0,
      limit: 5
    }
  })

  if (loading) return <Spinner />

  if (error) {
    return <div>error loading posts</div>
  }

  if (data && data.posts.posts !== null) {
    return (
      <PostsFeed
        posts={data.posts.posts || []}
        onLoadMorePosts={() =>
          fetchMore({
            variables: {
              offset: data.posts.offset
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev
              return Object.assign({}, prev, {
                posts: {
                  ...data.posts.posts,
                  ...fetchMoreResult.posts
                }
              })
            }
          })
        }
      />
    )
  }
  return <Spinner />
}

export default PostsPageWithData
