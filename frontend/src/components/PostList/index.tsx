import { NetworkStatus } from "@apollo/client"
import { Box } from "@chakra-ui/core"
import Post from "@components/PostList/Post"
import { usePostsQuery } from "@generated/graphql"
import * as React from "react"

export const allPostsQueryVars = {
  skip: 0,
  first: 4
}

const PostList = () => {
  const { loading, data, error, fetchMore, networkStatus } = usePostsQuery({
    variables: allPostsQueryVars,
    notifyOnNetworkStatusChange: true
  })
  if (error) return <div>error loading posts</div>
  if (loading) return null

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore
  const loadMorePosts = () => {
    fetchMore({
      variables: {
        skip: data?.posts?.length ?? 0
      }
    })
  }

  const allPosts = data?.posts ?? []
  const _allPostsMeta = data?._allPostsMeta
  const areMorePosts = (allPosts?.length ?? 1) < (_allPostsMeta?.count ?? 0)

  const ViewPosts = () => {
    if (allPosts.length > 0) {
      return (
        <ul>
          {allPosts.map((post, index) => (
            <Post key={`Post(${index}-${post.title})`} post={post} />
          ))}
        </ul>
      )
    }
    return <div>No posts here</div>
  }

  const ShowMorePosts = () => {
    if (areMorePosts) {
      return (
        <ul>
          <button onClick={() => loadMorePosts()} disabled={loadingMorePosts}>
            {loadingMorePosts ? "Loading..." : "Show More"}
          </button>
        </ul>
      )
    } else {
      return null
    }
  }

  return (
    <Box>
      <ViewPosts />
      <ShowMorePosts />
    </Box>
  )
}

export default PostList
