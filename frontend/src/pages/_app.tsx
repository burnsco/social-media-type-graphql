import { ChakraWrapper } from "@/components/common"
import { useApollo } from "@/lib/apolloClient"
import { ApolloProvider } from "@apollo/client"
import type { AppProps } from "next/dist/next-server/lib/router/router"

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <ChakraWrapper>
        <Component {...pageProps} />
      </ChakraWrapper>
    </ApolloProvider>
  )
}
