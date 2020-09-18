import { Box, Stack } from "@chakra-ui/core"
import Header from "@components/Header"
import { CategoriesDocument } from "@generated/graphql"
import { initializeApollo } from "@lib/apolloClient"
import { GetStaticProps } from "next"
import * as React from "react"
import SideMenu from "./SideMenu"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <Box maxW="1200px" minH="100vh" mx="auto">
        <Stack isInline spacing={8}>
          <Box as="main" width="100%">
            {children}
          </Box>

          <Box width="200px">
            <SideMenu />
          </Box>
        </Stack>
      </Box>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: CategoriesDocument
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    }
  }
}

export default Layout
