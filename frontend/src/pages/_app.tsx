import Layout from "@/components/Layout"
import { useApollo } from "@/lib/apolloClient"
import { ApolloProvider } from "@apollo/client"
import { ChakraProvider, ColorModeScript } from "@chakra-ui/core"
import { DefaultSeo } from "next-seo"
import { AppProps } from "next/dist/next-server/lib/router/router"
import Head from "next/head"
import siteConfig from "../configs/site-config"
import theme from "../styles/theme"

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <>
      <Head>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="description"
          content="A Reddit clone to learn typescript, graphql, testing and more."
        />
      </Head>
      <DefaultSeo {...siteConfig.seo} />
      <ApolloProvider client={apolloClient}>
        <ChakraProvider resetCSS theme={theme}>
          <ColorModeScript initialColorMode="dark" />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </ApolloProvider>
    </>
  )
}
