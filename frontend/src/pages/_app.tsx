import Layout from "@/components/Layout"
import { useApollo } from "@/lib/apolloClient"
import { ApolloProvider } from "@apollo/client"
import { ChakraProvider, ColorModeScript } from "@chakra-ui/core"
import { AppProps } from "next/dist/next-server/lib/router/router"
import theme from "../styles/theme"

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
