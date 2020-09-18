import { NetworkStatus } from '@apollo/client'
import { Box } from '@chakra-ui/core'
import { usePostsQuery } from '@generated/graphql'
import * as React from 'react'
import Post from './Post'

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

  const allPosts = data?.posts ?? []
  const _allPostsMeta = data?._allPostsMeta
  const areMorePosts = (allPosts?.length ?? 1) < (_allPostsMeta?.count ?? 0)

  return (
    <Box>
      <ul>
        {allPosts.map((post, index) => (
          <Post key={`Post(${index}-${post.title})`} post={post} />
        ))}
      </ul>
      {areMorePosts && (
        <button
          onClick={() => {
            fetchMore({
              variables: {
                skip: data?.posts.length ?? 0
              }
            })
          }}
          disabled={loadingMorePosts}
        >
          {loadingMorePosts ? 'Loading...' : 'Show More'}
        </button>
      )}
    </Box>
  )
}

export default PostPageWithData
