import { NetworkStatus } from "@apollo/client"
import { Box } from "@chakra-ui/core"
import { useAllPostsQuery } from "../../generated/graphql"
import Post from "../Post"

export const allPostsQueryVars = {
  skip: 0,
  first: 4
}

const PostList = () => {
  const { loading, data, error, fetchMore, networkStatus } = useAllPostsQuery({
    variables: allPostsQueryVars,
    notifyOnNetworkStatusChange: true
  })

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore

  const loadMorePosts = () => {
    fetchMore({
      variables: {
        skip: allPosts!.length
      }
    })
  }

  if (error) return <div>error loading posts</div>
  if (loading && !loadingMorePosts) return <div>Loading</div>

  const allPosts = data?.allPosts
  const _allPostsMeta = data?._allPostsMeta
  const areMorePosts = allPosts!.length < _allPostsMeta!.count

  return (
    <Box>
      <ul>
        {allPosts!.map((post, index) =>
          !post ? null : (
            <Post key={`Post(${index}-${post.title})`} post={post} />
          )
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
