import { Box, Flex, Heading, Spinner, Stack } from '@chakra-ui/core'
import Layout from '@components/layout'
import SideMenu from '@components/layout/SideMenu'
import {
  AllCategoriesDocument,
  AllCategoriesQuery,
  Post,
  PostsByCategoryDocument,
  PostsByCategoryQuery
} from '@generated/graphql'
import { initializeApollo } from '@lib/apolloClient'
import { useRouter } from 'next/router'
import * as React from 'react'

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
        <Box width='100%'>
          <Stack spacing={8}>
            {posts.map((post, index) => (
              <Flex
                key={`post-${post.title}-index-${index}`}
                p={5}
                shadow='md'
                borderWidth='1px'
                minW='100%'
              >
                <Box>
                  <Heading fontSize='xl'>Title - {post.title}</Heading>
                  <Heading fontSize='md'>
                    Category - {post.category.name}
                  </Heading>
                  <Heading fontSize='sm'>
                    CreatedBy - {post.author.username}
                  </Heading>
                </Box>
              </Flex>
            ))}
          </Stack>
        </Box>
        <Box width='200px' mx={2}>
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

  const paths = data?.categories.map((c) => ({
    params: { category: c.name }
  }))

  return { paths, fallback: true }
}

export default CategoryPage
