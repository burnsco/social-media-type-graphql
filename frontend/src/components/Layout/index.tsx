import { CategoriesDocument } from "@/generated/graphql"
import { initializeApollo } from "@/lib/apolloClient"
import { Box, Stack, useColorModeValue } from "@chakra-ui/core"
import { GetStaticProps } from "next"
import * as React from "react"
import Header from "../Header"
import SideMenu from "./SideMenu"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const bg = useColorModeValue("#DAE0E6", "black")
  return (
    <>
      <Header />
      <Box minH="100vh" bg={bg}>
        <Stack isInline spacing={8} mx="auto" py="6em" px={4}>
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
