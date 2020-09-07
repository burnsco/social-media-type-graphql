import { ApolloProvider } from "@apollo/client"
import { ChakraProvider, theme } from "@chakra-ui/core"
import { AppProps } from "next/dist/next-server/lib/router/router"
import { useApollo } from "../lib/apolloClient"

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  )
}
