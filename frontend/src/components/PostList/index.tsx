import { NetworkStatus } from "@apollo/client"
import { Box, Flex, Heading } from "@chakra-ui/core"
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
            <Flex
              key={`post-${post.title}-${index}-${post.id}`}
              p={5}
              shadow="md"
              borderWidth="1px"
              minW="100%"
            >
              <Box>
                <Heading fontSize="xl">Title - {post?.title ?? "404"}</Heading>
                <Heading fontSize="md">
                  Category - {post?.category.name ?? "Not Found"}
                </Heading>
                <Heading fontSize="sm">
                  CreatedBy - {post?.author.username ?? "Not Found"}
                </Heading>
              </Box>
            </Flex>
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
