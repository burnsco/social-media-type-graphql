import * as React from "react"
import { Box } from "@chakra-ui/core"
import { AllCategoriesDocument } from "../../generated/graphql"
import { initializeApollo } from "../../lib/apolloClient"
import Header from "./header"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box maxW="1200px" minH="100vh" mx="auto">
      <Header />
      {children}
    </Box>
  )
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: AllCategoriesDocument
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    },
    revalidate: 1
  }
}

export default Layout
