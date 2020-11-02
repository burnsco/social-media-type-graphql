import Layout from "@/components/Layout"
import NewPost from "@/components/Post"
import ShowMorePosts from "@/components/PostList/showMore"
import { usePostsQuery } from "@/generated/graphql"
import { NetworkStatus } from "@apollo/client"
import { Skeleton, Text, VStack } from "@chakra-ui/core"
import { useRouter } from "next/router"

const CategoryData = () => {
  const router = useRouter()

  const category = router.query.category as string

  const { loading, data, error, fetchMore, networkStatus } = usePostsQuery({
    variables: {
      category: category,
      skip: 0,
      first: 2
    },
    notifyOnNetworkStatusChange: true
  })

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore

  const loadMorePosts = () => {
    fetchMore({
      variables: {
        skip: postsBySubreddit?.length ?? 0
      }
    })
  }

  const postsBySubreddit = data?.posts ?? []
  const _categoryPostsMeta = data?._categoryPostsMeta
  const areMorePosts =
    (postsBySubreddit?.length ?? 1) < (_categoryPostsMeta?.count ?? 0)

  return (
    <Layout title={category}>
      <Skeleton isLoaded={!loading || router.isFallback || !loadingMorePosts}>
        {postsBySubreddit.length > 0 ? (
          <VStack spacing={4}>
            {postsBySubreddit.map((post, index) => (
              <NewPost key={`post-${post.id}-${index}`} post={post} />
            ))}
          </VStack>
        ) : (
          <Text>No posts here.</Text>
        )}
        <ShowMorePosts
          loadMorePosts={loadMorePosts}
          areMorePosts={areMorePosts}
          loadingMorePosts={loadingMorePosts}
        />
      </Skeleton>
    </Layout>
  )
}

export default CategoryData
