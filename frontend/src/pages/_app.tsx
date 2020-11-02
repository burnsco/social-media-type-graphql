import { Chakra } from "@/components/Chakra/Chakra"
import { useApollo } from "@/lib/apolloClient"
import { ApolloProvider } from "@apollo/client"
import { AppProps } from "next/dist/next-server/lib/router/router"

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <Chakra>
        <Component {...pageProps} />
      </Chakra>
    </ApolloProvider>
  )
}
