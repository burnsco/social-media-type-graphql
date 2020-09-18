import PostList, { allPostsQueryVars } from "@components/PostList"
import { PostsDocument, PostsQuery } from "@generated/graphql"
import { initializeApollo } from "@lib/apolloClient"
import React from "react"

const Index = () => <PostList />

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
    revalidate: 5
  }
}

export default Index
