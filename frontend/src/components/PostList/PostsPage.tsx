import { Box } from '@chakra-ui/core'
import Post from '@components/Post'
import { PostsQuery } from '@generated/graphql'
import * as React from 'react'

const PostsPage: React.FC<PostsQuery> = (props) => {
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
        <button onClick={() => loadMorePosts()} disabled={loadingMorePosts}>
          {loadingMorePosts ? 'Loading...' : 'Show More'}
        </button>
      )}
    </Box>
  )
}

export default PostsPage
