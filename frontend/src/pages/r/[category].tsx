import { Box, Spinner, Stack } from '@chakra-ui/core'
import { useRouter } from 'next/router'
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
  const router = useRouter()

  if (router.isFallback) {
    return <Spinner />
  }

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

export const getStaticProps = async ({ params }: any) => {
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
    },
    revalidate: 1
  }
}

export const getStaticPaths = async () => {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query<AllCategoriesQuery>({
    query: AllCategoriesDocument
  })

  const paths = data?.categories?.map(cat => ({
    params: { category: cat.name }
  }))

  return { paths, fallback: true }
}

export default CategoryPage
