import PostList from "@/components/PostList"
import SEO from "@/components/shared/seo"
import { PostsDocument, PostsQuery } from "@/generated/graphql"
import { initializeApollo } from "@/lib/apolloClient"
import { allPostsQueryVars } from "@/types/pagination"

const Index = () => {
  return (
    <>
      <SEO
        title="Home"
        description="A typescript/react clone to learn graphql, postgres, apollo and more."
      />
      <PostList />
    </>
  )
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
