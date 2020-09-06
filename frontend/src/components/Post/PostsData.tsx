import { Spinner } from '@chakra-ui/core'
import React from 'react'
import { useAllPostsQuery } from '../../generated/graphql'
import PostsFeed from './PostsFeed'

const PostsPageWithData = () => {
  const { loading, error, data, fetchMore } = useAllPostsQuery({
    variables: {
      offset: 0,
      limit: 5
    }
  })

  if (loading) return <Spinner />

  if (error) {
    return <div>error loading posts</div>
  }

  if (data && data.allPosts !== null) {
    return (
      <PostsFeed
        {...(data.allPosts || [])}
        onLoadMorePosts={() =>
          fetchMore({
            variables: {
              offset: data.allPosts.totalPosts
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev
              return Object.assign({}, prev, {
                posts: {
                  ...data.allPosts.posts,
                  ...fetchMoreResult.allPosts
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
