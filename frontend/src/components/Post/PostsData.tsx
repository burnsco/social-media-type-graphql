import { Skeleton, Spinner } from '@chakra-ui/core'
import React from 'react'
import { useAllPostsQuery } from '../../generated/graphql'
import PostsFeed from './PostsFeed'

const PostsPageWithData: React.FC = () => {
  const { loading, error, data, fetchMore, networkStatus } = useAllPostsQuery({
    variables: {
      offset: 0,
      limit: 10
    },
    notifyOnNetworkStatusChange: true
  })

  if (error) {
    return <div>error loading posts</div>
  }

  if (data && data.posts) {
    return (
      <Skeleton startColor="pink" endColor="orange" isLoaded={!loading}>
        <PostsFeed
          posts={data?.posts || []}
          onLoadMore={() =>
            fetchMore({
              variables: {
                offset: data?.posts?.length
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev
                return Object.assign({}, prev, {
                  posts: [...prev.posts, ...fetchMoreResult.posts]
                })
              }
            })
          }
        />
      </Skeleton>
    )
  }
  return <Spinner />
}

export default PostsPageWithData
