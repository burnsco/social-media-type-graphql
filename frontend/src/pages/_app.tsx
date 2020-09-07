import * as React from "react"
import { ApolloProvider } from "@apollo/client"
import { ChakraProvider, theme } from "@chakra-ui/core"
import { AppProps } from "next/dist/next-server/lib/router/router"
import { useApollo } from "../lib/apolloClient"

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ChakraProvider>
  )
}
