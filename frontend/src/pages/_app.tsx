import Header from "@/components/Header"
import Layout from "@/components/Layout"
import { useApollo } from "@/lib/apolloClient"
import { ApolloProvider } from "@apollo/client"
import { ChakraProvider, ColorModeScript } from "@chakra-ui/core"
import theme from "@chakra-ui/theme"
import { AppProps } from "next/dist/next-server/lib/router/router"
import Head from "next/head"

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <>
      <Head>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon.png" />
        <meta name="theme-color" content="#319795" />
      </Head>
      <ApolloProvider client={apolloClient}>
        <ChakraProvider resetCSS theme={theme}>
          <ColorModeScript initialColorMode="dark" />
          <Header />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </ApolloProvider>
    </>
  )
}
