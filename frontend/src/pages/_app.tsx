import Layout from "@/components/Layout"
import { useApollo } from "@/lib/apolloClient"
import { ApolloProvider } from "@apollo/client"
import { ChakraProvider, ColorModeScript } from "@chakra-ui/core"
import theme from "@chakra-ui/theme"
import { AppProps } from "next/dist/next-server/lib/router/router"
import * as React from "react"

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeScript initialColorMode="dark" />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </ApolloProvider>
  )
}
