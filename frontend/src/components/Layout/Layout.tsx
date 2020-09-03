import React from 'react'
import { initializeApollo } from '../../lib/apolloClient'
import { SubredditsDocument } from '../src/generated/graphql'
import Header from './header'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: SubredditsDocument
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
