import { Box } from "@chakra-ui/core"
import Header from "../components/layout/header"
import PostList from "../components/PostList"
import { allPostsQueryVars } from "../components/PostList"
import { AllPostsDocument } from "../generated/graphql"
import { initializeApollo } from "../lib/apolloClient"

const Index = () => (
  <Box>
    <Header />
    <PostList />
  </Box>
)

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: AllPostsDocument,
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
