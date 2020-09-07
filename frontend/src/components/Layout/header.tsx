import * as React from "react"
import {
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from "@chakra-ui/core"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { useLogoutMutation, useMeQuery } from "../../generated/graphql"
import { RedditLogoLarge } from "../../styles/redditLogos"
import { ColorModeToggle } from "./ColorModeToggle"

const Header: React.FC = () => {
  const router = useRouter()

  const { data, loading } = useMeQuery({ ssr: false })

  const [logout, { client, loading: fetchingLogout }] = useLogoutMutation()

  if (loading) return null

  return (
    <Flex
      as="header"
      justifyContent="space-between"
      alignItems="center"
      mb={8}
      borderBottom="1px"
      borderBottomStyle="solid"
      borderBottomColor="gray.100"
      height="60px"
    >
      <Flex w="100%" as="nav" justify="space-between" alignItems="center">
        <Flex mr={5}>
          <Heading as="h1" size="lg">
            <NextLink href="/">
              <RedditLogoLarge width="140px" height="40px" />
            </NextLink>
          </Heading>
        </Flex>
        <Flex justify="end">
          <Box
            ml={5}
            display="flex"
            width="auto"
            alignItems="center"
            justifyContent="space-evenly"
            flexGrow={1}
          >
            {data && data?.me?.username ? (
              <Menu>
                <Menu>
                  <MenuButton as={Button}>Create</MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => router.push("/create-post")}>
                      Post
                    </MenuItem>
                    <MenuItem onClick={() => router.push("/create-subreddit")}>
                      Subreddit
                    </MenuItem>
                  </MenuList>
                </Menu>
                <Menu>
                  <MenuButton as={Button}>{data.me.username}</MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => router.push("/user/profile")}>
                      My Profile
                    </MenuItem>
                    <MenuItem onClick={() => router.push("/user/settings")}>
                      User Settings
                    </MenuItem>
                    <MenuItem onClick={() => router.push("/nightmode")}>
                      Night Mode
                    </MenuItem>
                  </MenuList>
                </Menu>

                <Button
                  mr={2}
                  color="red.500"
                  variant="link"
                  isLoading={fetchingLogout}
                  onClick={async () => {
                    await logout()
                    await client.resetStore()
                  }}
                >
                  Logout
                </Button>
              </Menu>
            ) : (
              <Menu>
                <MenuButton
                  variant="outline"
                  mr={2}
                  as={Button}
                  onClick={() => router.push("/register")}
                >
                  Register
                </MenuButton>
                <MenuButton
                  mr={2}
                  as={Button}
                  onClick={() => router.push("/login")}
                >
                  Login
                </MenuButton>
              </Menu>
            )}
            <ColorModeToggle mr={2} />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Header
