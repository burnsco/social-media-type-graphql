import { Box, HStack } from '@chakra-ui/core'
import React from 'react'
import Layout from '../components/Layout/Layout'
import SideMenu from '../components/Layout/SideMenu'
import { initializeApollo } from '../lib/apolloClient'
import Posts from '../components/Posts'
import { AllPostsDocument } from '../generated/graphql'

const Index: React.FC = () => {
  return (
    <Layout>
      <HStack spacing={8}>
        <Box width="70%">
          <Posts />
        </Box>
        <SideMenu />
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
