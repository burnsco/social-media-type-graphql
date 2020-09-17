import { Box, Stack } from '@chakra-ui/core'
import Layout from '@components/Layout'
import SideMenu from '@components/Layout/SideMenu'
import PostList, {
  allPostsQueryVars
} from '@components/PostList/PostsPageWithData'
import { PostsDocument, PostsQuery } from '@generated/graphql'
import { initializeApollo } from '@lib/apolloClient'
import React from 'react'

const Index = () => (
  <Layout>
    <Stack isInline spacing={8}>
      <Box width='100%'>
        <PostList />
      </Box>
      <Box width='200px' mx={2}>
        <SideMenu />
      </Box>
    </Stack>
  </Layout>
)

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query<PostsQuery>({
    query: PostsDocument,
    variables: allPostsQueryVars
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    },
    revalidate: 1
  }
}

export default Index
