import { Box } from '@chakra-ui/core'
import Header from '@components/Header'
import { CategoriesDocument } from '@generated/graphql'
import { initializeApollo } from '@lib/apolloClient'
import { GetStaticProps } from 'next'
import * as React from 'react'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <Box maxW='1200px' minH='100vh' mx='auto'>
        <Box m={[3, 4, 5]} p={2}>
          {children}
        </Box>
      </Box>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
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
