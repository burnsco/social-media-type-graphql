import NextLink from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import { RedditLogoLarge } from 'src/styles/redditLogos'

import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select
} from '@chakra-ui/core'
import { useLogoutMutation, useMeQuery } from '@generated/graphql'

import { ColorModeToggle } from '../layout/ColorModeToggle'

const Header: React.FC = () => {
  const router = useRouter()

  const { data, loading } = useMeQuery({ ssr: false })

  const [logout, { client, loading: fetchingLogout }] = useLogoutMutation()

  if (loading) return null

  return (
    <Flex
      as='header'
      minW='100%'
      justifyContent='space-between'
      mb={8}
      borderBottom='1px'
      borderBottomStyle='solid'
      borderBottomColor='gray.100'
      height='60px'
    >
      <Flex as='nav' justify='space-between' alignItems='center'>
        <Flex mr={5}>
          <Heading as='h1' size='lg'>
            <NextLink href='/'>
              <RedditLogoLarge width='140px' height='40px' />
            </NextLink>
          </Heading>
        </Flex>
        <Flex justify='space-evenly'>
          <Box
            ml={5}
            display='flex'
            width='auto'
            alignItems='center'
            justifyContent='space-evenly'
            flexGrow={1}
          >
            <Input variant='outline' placeholder='Outline' />
            <Select placeholder='Select option'>
              <option value='option1'>Option 1</option>
              <option value='option2'>Option 2</option>
              <option value='option3'>Option 3</option>
            </Select>
            {data && data?.me?.username ? (
              <Menu>
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
                <Menu>
                  <MenuButton as={Button}>{data.me.username}</MenuButton>
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

                <Button
                  mr={2}
                  color='red.500'
                  variant='link'
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
                  variant='outline'
                  mr={2}
                  as={Button}
                  onClick={() => router.push('/register')}
                >
                  Register
                </MenuButton>
                <MenuButton
                  mr={2}
                  as={Button}
                  onClick={() => router.push('/login')}
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
