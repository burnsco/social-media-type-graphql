import Header from "@/components/Header"
import { Box, Stack } from "@chakra-ui/core"
import dynamic from "next/dynamic"
import Head from "next/head"
import PropTypes from "prop-types"
import * as React from "react"

const NavigationRight = dynamic(() => import("@/components/Layout/SideMenu"))

const Layout: React.FC<{ children: React.ReactNode; title: string }> = ({
  children,
  title
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
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
        <meta name="theme-color" content="#1A1A1B" />
        <meta
          name="description"
          content="A Reddit clone to learn typescript, graphql, testing and more."
        />
      </Head>

      <Header />
      <Box minH="100vh" px={["0em", "2em", "4em", "6em"]} py="6em">
        <Stack isInline spacing={14}>
          <Box as="main" width="full">
            {children}
          </Box>

          <Box as="aside" width="200px" display={["none", "none", "block"]}>
            <NavigationRight />
          </Box>
        </Stack>
      </Box>
    </>
  )
}

Layout.propTypes = {
  title: PropTypes.string.isRequired
}

export default Layout
