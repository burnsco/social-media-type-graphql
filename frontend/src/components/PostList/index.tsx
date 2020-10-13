import { usePostsQuery } from "@/generated/graphql"
import { allPostsQueryVars } from "@/types/post"
import { NetworkStatus } from "@apollo/client"
import { Box, Button } from "@chakra-ui/core"
import { useEffect, useState } from "react"
import NewPost from "../Post"

const PostList = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [isMounted])

  const { loading, data, error, fetchMore, networkStatus } = usePostsQuery({
    variables: allPostsQueryVars,
    notifyOnNetworkStatusChange: true,
    skip: !isMounted
  })
  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore

  if (error) return <div>error loading posts</div>
  if (loading && !loadingMorePosts) return <div>loading...</div>

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
  console.log(data)
  const ViewPosts = () => {
    if (allPosts.length > 0) {
      return (
        <ul>
          {allPosts.map((post, index) => (
            <NewPost key={`post-${post.id}-${index}`} post={post} />
          ))}
        </ul>
      )
    }
    return <div>No posts here</div>
  }

  const ShowMorePosts = () => {
    if (areMorePosts) {
      return (
        <Box m={2}>
          <Button
            variant="outline"
            onClick={() => loadMorePosts()}
            disabled={loadingMorePosts}
          >
            {loadingMorePosts ? "Loading..." : "Show More"}
          </Button>
        </Box>
      )
    } else {
      return null
    }
  }

  if (isMounted) {
    return (
      <Box>
        <ViewPosts />
        <ShowMorePosts />
      </Box>
    )
  }
  return null
}

export default PostList
