import { Box, HStack } from '@chakra-ui/core'
import React from 'react'
import Layout from '../components/Layout'
import SideMenu from '../components/Layout/SideMenu'
import PostsPage from '../components/Posts/PostsData'
import { AllPostsDocument } from '../generated/graphql'
import { initializeApollo } from '../lib/apolloClient'

const Index: React.FC = () => {
  return (
    <Layout>
      <HStack border="2px solid blue">
        <Box width="100%" border="2px dashed green">
          <PostsPage />
        </Box>
        <Box p={3} width="180px" minH="100%" border="2px dashed purple" mx={2}>
          <SideMenu />
        </Box>
      </HStack>
    </Layout>
  )
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: AllPostsDocument
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    },
    revalidate: 1
  }
}

export default Index
