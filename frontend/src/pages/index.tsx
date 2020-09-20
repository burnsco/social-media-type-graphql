import PostList from "@components/PostList"
import { PostsDocument, PostsQuery } from "@generated/graphql"
import { initializeApollo } from "@lib/apolloClient"
import React from "react"
import { allPostsQueryVars } from "src/types/post"

const Index: React.FC = () => {
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
    }
  }
}

export default Index
