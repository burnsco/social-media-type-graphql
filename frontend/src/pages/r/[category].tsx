import { NetworkStatus } from "@apollo/client"
import { Box, Flex, Heading, Spinner, Stack } from "@chakra-ui/core"
import {
  CategoriesDocument,
  Category,
  PostsDocument,
  PostsQuery,
  usePostsQuery
} from "@generated/graphql"
import { initializeApollo } from "@lib/apolloClient"
import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import PropTypes from "prop-types"
import * as React from "react"

const CategoryPage: React.FC<{ category: string }> = ({ category }) => {
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [isMounted])

  const { loading, data, error, fetchMore, networkStatus } = usePostsQuery({
    variables: {
      category: category,
      skip: 0,
      first: 4
    },
    notifyOnNetworkStatusChange: true,
    skip: !isMounted
  })

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore

  const loadMorePosts = () => {
    fetchMore({
      variables: {
        skip: postsBySubreddit?.length ?? 0
      }
    })
  }

  const router = useRouter()

  if (router.isFallback) {
    return <Spinner />
  }

  if (error) return <div>error loading posts</div>

  if (loading && !loadingMorePosts) return null

  const postsBySubreddit = data?.posts ?? []
  const _categoryPostsMeta = data?._categoryPostsMeta
  const areMorePosts =
    (postsBySubreddit?.length ?? 1) < (_categoryPostsMeta?.count ?? 0)

  if (postsBySubreddit) {
    return (
      <Box>
        {postsBySubreddit.length > 0 && (
          <Stack spacing={8}>
            {postsBySubreddit.map((post, index) => (
              <Flex
                key={`post-${post.title}-index-${index}`}
                p={5}
                shadow="md"
                borderWidth="1px"
                minW="100%"
              >
                <Box>
                  <Heading fontSize="xl">Title - {post.title}</Heading>
                  <Heading fontSize="md">
                    Category - {post.category.name}
                  </Heading>
                  <Heading fontSize="sm">
                    CreatedBy - {post.author.username}
                  </Heading>
                </Box>
              </Flex>
            ))}
            {areMorePosts && (
              <button
                onClick={() => loadMorePosts()}
                disabled={loadingMorePosts}
              >
                {loadingMorePosts ? "Loading..." : "Show More"}
              </button>
            )}
          </Stack>
        )}
      </Box>
    )
  }
  return <div>No posts here.</div>
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo()

  await apolloClient.query<PostsQuery>({
    query: PostsDocument,
    variables: {
      category: params?.category ?? "funny",
      skip: 0,
      first: 4
    }
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      category: params?.category
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query({
    query: CategoriesDocument
  })

  const paths = data.categories.map((item: Category) => `/r/${item.name}`)

  return {
    paths,
    fallback: false
  }
}

CategoryPage.propTypes = {
  category: PropTypes.string.isRequired
}

export default CategoryPage
