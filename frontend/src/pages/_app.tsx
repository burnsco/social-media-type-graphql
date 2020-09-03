import { ApolloProvider } from '@apollo/client'
import React from 'react'
import { ChakraProvider, theme } from '@chakra-ui/core'
import { AppProps } from 'next/app'
import { useApollo } from '../lib/apolloClient'

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  )
}
