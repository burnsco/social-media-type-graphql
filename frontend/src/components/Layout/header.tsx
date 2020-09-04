import React from 'react'
import {
  Box,
  Heading,
  Flex,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/core'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useMeQuery } from '../../generated/graphql'
import { RedditLogoLarge } from '../../styles/redditLogos'

const Header: React.FC = () => {
  const router = useRouter()

  const { data, loading } = useMeQuery()

  if (loading) return null

  return (
    <Box
      as="header"
      p={2}
      backgroundColor="#fff"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.05)"
      borderBottom="1px solid #ebedf0"
      height="60px"
    >
      <Flex w="100%" h="100%" as="nav" align="center" wrap="wrap">
        <Flex mr={5}>
          <Heading as="h1" size="lg">
            <NextLink href="/">
              <RedditLogoLarge width="140px" height="40px" />
            </NextLink>
          </Heading>
        </Flex>
        <Flex justify="end">
          <Menu>
            <MenuButton as={Button}>Create</MenuButton>
            <MenuList>
              <MenuItem onClick={() => router.push('/create-post')}>
                Post
              </MenuItem>
              <MenuItem onClick={() => router.push('/create-subreddit')}>
                Subreddit
              </MenuItem>
            </MenuList>
          </Menu>
          <Box
            display={{ block: 'none', md: 'flex' }}
            width={{ sm: 'full', md: 'auto' }}
            alignItems="center"
            justifyContent="space-evenly"
            flexGrow={1}
          >
            {data && data?.me?.username ? (
              <Menu>
                <NextLink href="/profile">
                  <Link>{data.me.username}</Link>
                </NextLink>
                <Menu>
                  <MenuButton as={Button}>User Menu</MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => router.push('/user/profile')}>
                      My Profile
                    </MenuItem>
                    <MenuItem onClick={() => router.push('/user/settings')}>
                      User Settings
                    </MenuItem>
                    <MenuItem onClick={() => router.push('/nightmode')}>
                      Night Mode
                    </MenuItem>
                  </MenuList>
                </Menu>

                {/* <Button
                color="red.500"
                variant="link"
                isLoading={logoutFetching}
                onClick={async () => {
                  await logout()
                  await client.resetStore()
                }}
              >
                Logout
              </Button> */}
              </Menu>
            ) : (
              <Menu>
                <NextLink href="/register">
                  <Link>Register</Link>
                </NextLink>

                <NextLink href="/login">
                  <Link>Login</Link>
                </NextLink>

                <NextLink href="/posts">
                  <Link>Posts</Link>
                </NextLink>
              </Menu>
            )}
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Header
