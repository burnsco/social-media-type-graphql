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
  MenuItem,
  IconButton
} from '@chakra-ui/core'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useMeQuery } from '../../generated/graphql'

const Header: React.FC = () => {
  const router = useRouter()

  const { data, loading } = useMeQuery()

  if (loading) return null

  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1.5rem"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg">
            <NextLink href="/">
              <IconButton aria-label="Home" name="redditSmall" />
            </NextLink>
          </Heading>
        </Flex>
        <Menu>
          <MenuButton as={Button}>Actions</MenuButton>
          <MenuList>
            <MenuItem onClick={() => router.push('/create-post')}>
              Create Post
            </MenuItem>
            <MenuItem onClick={() => router.push('/create-subreddit')}>
              Create Subreddit
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
    </>
  )
}

export default Header
