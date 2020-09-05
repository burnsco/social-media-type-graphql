import { Box, Flex, Heading, Stack } from '@chakra-ui/core'
import * as React from 'react'
import Layout from '../../components/layout'
import SideMenu from '../../components/layout/SideMenu'
import PostComponent from '../../components/post'
import {
  AllCategoriesDocument,
  AllCategoriesQuery,
  Post,
  PostsByCategoryDocument,
  PostsByCategoryQuery
} from '../../generated/graphql'
import { initializeApollo } from '../../lib/apolloClient'

const CategoryPage: React.FunctionComponent<{ posts: Post[] }> = ({
  posts
}) => {
  return (
    <Layout>
      <Stack isInline spacing={8}>
        <Box width="100%">
          <Stack spacing={8}>
            {posts.map(post => (
              <PostComponent key={`post-${post.id}`} post={post} />
            ))}
          </Stack>
        </Box>
        <Box width="200px" mx={2}>
          <SideMenu />
        </Box>
      </Stack>
    </Layout>
  )
}

export async function getStaticProps({ params }: any) {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query<PostsByCategoryQuery>({
    query: PostsByCategoryDocument,
    variables: {
      category: params.category
    }
  })

  return {
    props: {
      posts: data?.postsByCategory ?? null
    }
  }
}

export async function getStaticPaths() {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query<AllCategoriesQuery>({
    query: AllCategoriesDocument
  })

  return {
    paths: data?.categories?.map(({ name }: any) => `/r/${name}`) ?? [],
    fallback: false
  }
}

export default CategoryPage
