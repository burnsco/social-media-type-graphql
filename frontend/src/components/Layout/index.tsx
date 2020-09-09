import * as React from 'react'

import { Box } from '@chakra-ui/core'
import { CategoriesDocument } from '@generated/graphql'
import { initializeApollo } from '@lib/apolloClient'

import Header from '../Header'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <Box maxW='1200px' minH='100vh' mx='auto'>
        {children}
      </Box>
    </>
  )
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: CategoriesDocument
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    },
    revalidate: 1
  }
}

export default Layout
