import { NetworkStatus } from "@apollo/client"
import { Box } from "@chakra-ui/core"
import Post from "@components/Post"
import { useAllPostsQuery } from "@generated/graphql"
import * as React from "react"
import { PaginationArgs } from "src"

export const allPostsQueryVars: PaginationArgs = {
  skip: 0,
  first: 4,
}

const PostList = () => {
  const { loading, data, error, fetchMore, networkStatus } = useAllPostsQuery({
    variables: allPostsQueryVars,
    notifyOnNetworkStatusChange: true,
  })

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore

  const loadMorePosts = () => {
    fetchMore({
      variables: {
        skip: allPosts?.length ?? 0,
      },
    })
  }

  if (error) return <div>error loading posts</div>

  if (loading && !loadingMorePosts) return <div>Loading</div>

  const allPosts = data?.allPosts
  const _allPostsMeta = data?._allPostsMeta
  const areMorePosts =
    (allPosts?.length ?? false) < (_allPostsMeta?.count ?? false)

  return (
    <Box>
      <ul>
        {allPosts?.map((post, index) =>
          !post ? null : (
            <Post key={`Post(${index}-${post.title})`} post={post} />
          ),
        )}
      </ul>
      {areMorePosts && (
        <button onClick={() => loadMorePosts()} disabled={loadingMorePosts}>
          {loadingMorePosts ? "Loading..." : "Show More"}
        </button>
      )}
    </Box>
  )
}

export default PostList
