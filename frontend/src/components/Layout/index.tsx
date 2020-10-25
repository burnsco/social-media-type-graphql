import { CategoriesDocument } from "@/generated/graphql"
import { initializeApollo } from "@/lib/apolloClient"
import { Box, Stack, useColorModeValue } from "@chakra-ui/core"
import { GetStaticProps } from "next"
import Header from "../Header"
import SideMenu from "./SideMenu"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const bg = useColorModeValue("gray.200", "black")
  return (
    <>
      <Header />
      <Box minH="100vh" bg={bg}>
        <Stack isInline spacing={8} py="6em" px={["0em", "2em", "2em", "4em"]}>
          <Box as="main" width="full">
            {children}
          </Box>

          <Box width="200px" display={["none", "none", "block", "block"]}>
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
