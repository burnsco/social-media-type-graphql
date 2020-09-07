import { Heading } from "@chakra-ui/core"
import PostList from "../components/PostList/PostsData"
import { allPostsQueryVars } from "../components/PostList/PostsData"
import { AllPostsDocument } from "../generated/graphql"
import { initializeApollo } from "../lib/apolloClient"

const Index = () => (
  <>
    <Heading>Hey</Heading>
    <PostList />
    <Heading>Hey</Heading>
  </>
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
