import { NetworkStatus } from '@apollo/client'
import { Box, Flex, Heading, Spinner, Stack } from '@chakra-ui/core'
import Layout from '@components/layout'
import SideMenu from '@components/layout/SideMenu'
import {
  CategoriesDocument,
  Category,
  PostsDocument,
  PostsQuery,
  usePostsQuery
} from '@generated/graphql'
import { initializeApollo } from '@lib/apolloClient'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import * as React from 'react'

const CategoryPage = ({ category }: any) => {
  console.log(category)
  const { loading, data, error, fetchMore, networkStatus } = usePostsQuery({
    variables: {
      category: category
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

  const router = useRouter()

  if (router.isFallback) {
    return <Spinner />
  }

  if (error) return <div>error loading posts</div>

  if (loading && !loadingMorePosts) return <div>Loading</div>

  const postsBySubreddit = data?.posts ?? []
  const _allPostsMeta = data?._allPostsMeta
  const areMorePosts =
    (postsBySubreddit?.length ?? 1) < (_allPostsMeta?.count ?? 0)

  if (postsBySubreddit) {
    return (
      <Layout>
        <Stack isInline spacing={8}>
          <Box width='100%'>
            <Stack spacing={8}>
              {postsBySubreddit.map((post, index) => (
                <Flex
                  key={`post-${post.title}-index-${index}`}
                  p={5}
                  shadow='md'
                  borderWidth='1px'
                  minW='100%'
                >
                  <Box>
                    <Heading fontSize='xl'>Title - {post.title}</Heading>
                    <Heading fontSize='md'>
                      Category - {post.category.name}
                    </Heading>
                    <Heading fontSize='sm'>
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
                  {loadingMorePosts ? 'Loading...' : 'Show More'}
                </button>
              )}
            </Stack>
          </Box>
          <Box width='200px' mx={2}>
            <SideMenu />
          </Box>
        </Stack>
      </Layout>
    )
  }
  return <div>No posts here.</div>
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo()

  await apolloClient.query<PostsQuery>({
    query: PostsDocument,
    variables: {
      category: params?.category ?? 'funny',
      skip: 0,
      last: 4
    }
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      category: params?.category
    },
    revalidate: 1
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

export default CategoryPage
