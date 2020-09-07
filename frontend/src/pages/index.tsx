import { Box, Stack } from "@chakra-ui/core"
import Layout from "@components/layout"
import SideMenu from "@components/layout/SideMenu"
import PostList, { allPostsQueryVars } from "@components/PostList"
import { AllPostsDocument } from "@generated/graphql"
import { initializeApollo } from "@lib/apolloClient"
import React from "react"

const Index = () => (
  <Layout>
    <Stack isInline spacing={8}>
      <Box width="100%">
        <PostList />
      </Box>
      <Box width="200px" mx={2}>
        <SideMenu />
      </Box>
    </Stack>
  </Layout>
)

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: AllPostsDocument,
    variables: allPostsQueryVars,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  }
}

export default Index
