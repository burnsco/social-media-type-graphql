import { NetworkStatus } from '@apollo/client'
import { Box } from '@chakra-ui/core'
import Post from '@components/Post'
import { usePostsQuery } from '@generated/graphql'
import * as React from 'react'

export const allPostsQueryVars = {
  skip: 0,
  first: 4
}

const PostList = () => {
  const { loading, data, error, fetchMore, networkStatus } = usePostsQuery({
    variables: allPostsQueryVars,
    notifyOnNetworkStatusChange: true
  })

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore

  const loadMorePosts = () => {
    fetchMore({
      variables: {
        skip: data?.posts?.length ?? 0
      }
    })
  }

  if (error) return <div>error loading posts</div>

  if (loading && !loadingMorePosts) return <div>Loading</div>

  const allPosts = data?.posts ?? []
  const _allPostsMeta = data?._allPostsMeta
  const areMorePosts = (allPosts?.length ?? 1) < (_allPostsMeta?.count ?? 0)

  if (allPosts) {
    return (
      <Box>
        <ul>
          {allPosts.map((post, index) => (
            <Post key={`Post(${index}-${post.title})`} post={post} />
          ))}
        </ul>
        {areMorePosts && (
          <button onClick={() => loadMorePosts()} disabled={loadingMorePosts}>
            {loadingMorePosts ? 'Loading...' : 'Show More'}
          </button>
        )}
      </Box>
    )
  }
  return <div>No Posts.</div>
}

export default PostList
