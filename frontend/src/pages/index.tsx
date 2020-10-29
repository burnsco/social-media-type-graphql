import PostList from "@/components/PostList"
import { PostsDocument, PostsQuery } from "@/generated/graphql"
import { initializeApollo } from "@/lib/apolloClient"
import { allPostsQueryVars } from "@/types/pagination"

const Index = () => {
  return <PostList />
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query<PostsQuery>({
    query: PostsDocument,
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
