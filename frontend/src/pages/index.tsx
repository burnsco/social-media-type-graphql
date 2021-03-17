import { PostsDocument, PostsQuery } from "@/generated/graphql"
import { initializeApollo } from "@/lib/apolloClient"
import { allPostsQueryVars } from "@/types/pagination"
import dynamic from "next/dynamic"

const DynamicPostList = dynamic(
  () => import("@/components/pages/PostList/index")
)

const IndexPage = () => <DynamicPostList />

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
    revalidate: 10
  }
}

export default IndexPage
