import { NetworkStatus } from '@apollo/client'
import { Box, Flex, Heading, Spinner, Stack } from '@chakra-ui/core'
import Layout from '@components/layout'
import SideMenu from '@components/layout/SideMenu'
import {
  CategoriesDocument,
  CategoriesQuery,
  PostsDocument,
  PostsQuery,
  usePostsQuery
} from '@generated/graphql'
import { initializeApollo } from '@lib/apolloClient'
import { useRouter } from 'next/router'
import * as React from 'react'

const CategoryPage: React.FunctionComponent<{}> = () => {
  const router = useRouter()
  const { loading, data, error, fetchMore, networkStatus } = usePostsQuery({
    variables: {
      skip: 0,
      first: 5,
      category: 
    },
    notifyOnNetworkStatusChange: true
  })

  if (router.isFallback) {
    return <Spinner />
  }
  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore

  const loadMorePosts = () => {
    fetchMore({
      variables: {
        skip: allPosts?.length ?? 0
      }
    })
  }

  if (error) return <div>error loading posts</div>

  if (loading && !loadingMorePosts) return <div>Loading</div>

  const allPosts = data?.posts
  const _allPostsMeta = data?._allPostsMeta
  const areMorePosts =
    (allPosts?.length ?? false) < (_allPostsMeta?.count ?? false)

  return (
    <Layout>
      <Stack isInline spacing={8}>
        <Box width='100%'>
          <Stack spacing={8}>
            {allPosts?.map((post, index) => (
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
          </Stack>
          {areMorePosts && (
            <button onClick={() => loadMorePosts()} disabled={loadingMorePosts}>
              {loadingMorePosts ? 'Loading...' : 'Show More'}
            </button>
          )}
        </Box>
        <Box width='200px' mx={2}>
          <SideMenu />
        </Box>
      </Stack>
    </Layout>
  )
}

export const getStaticProps = async ({ params }: any) => {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query<PostsQuery>({
    query: PostsDocument,
    variables: {
      category: params.category,
      skip: 0,
      last: 4

    }
  })

  return {
    props: {
      posts: data?.posts ?? null
    },
    revalidate: 1
  }
}

export const getStaticPaths = async () => {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query<CategoriesQuery>({
    query: CategoriesDocument
  })

  const paths = data?.categories.map((c) => ({
    params: { category: c.name }
  }))

  return { paths, fallback: true }
}

export default CategoryPage
