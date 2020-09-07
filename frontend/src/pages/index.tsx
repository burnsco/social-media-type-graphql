import { Box, Stack } from '@chakra-ui/core'
import React from 'react'
import Layout from '../components/layout'
import SideMenu from '../components/layout/SideMenu'
import PostsPage from '../components/post/PostsData'
import { AllPaginatedPostsDocument } from '../generated/graphql'
import { initializeApollo } from '../lib/apolloClient'

const Index: React.FC = () => {
  return (
    <Layout>
      <Stack isInline spacing={8}>
        <Box width="100%">
          <PostsPage />
        </Box>
        <Box width="200px" mx={2}>
          <SideMenu />
        </Box>
      </Stack>
    </Layout>
  )
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: AllPaginatedPostsDocument,
    variables: {
      offset: 0,
      limit: 5
    }
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    },
    revalidate: 1
  }
}

export default Index
