import { Box } from '@chakra-ui/core'
import React from 'react'
import { AllCategoriesDocument } from '../../generated/graphql'
import { initializeApollo } from '../../lib/apolloClient'
import Header from './Header'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <Box maxWidth="1200px" mx={[2, 4, 6]}>
        {children}
      </Box>
    </>
  )
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: AllCategoriesDocument
  })

  const test = apolloClient.cache.extract()
  console.log(test)

  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    },
    revalidate: 1
  }
}

export default Layout
