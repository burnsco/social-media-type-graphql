import { NetworkStatus } from '@apollo/client'
import { usePostsQuery } from '@generated/graphql'
import * as React from 'react'
import PostsPage from './PostsPage'

export const allPostsQueryVars = {
  skip: 0,
  first: 4
}

const PostPageWithData: React.FC = () => {
  const { loading, error, fetchMore, networkStatus, data } = usePostsQuery({
    variables: allPostsQueryVars,
    notifyOnNetworkStatusChange: true
  })

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore

  if (error) return <div>error loading posts</div>

  if (loading && !loadingMorePosts) return <div>Loading</div>

  return (
    <PostsPage
      {...data}
      onLoadMorePosts={() =>
        fetchMore({
          variables: {
            skip: data?.posts?.length ?? 0
          }
        })
      }
    />
  )
}

export default PostPageWithData
