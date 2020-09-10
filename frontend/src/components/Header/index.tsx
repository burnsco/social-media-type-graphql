import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList
} from '@chakra-ui/core'
import { TestModal } from '@components/Modal'
import { useLogoutMutation, useMeQuery } from '@generated/graphql'
import { useRouter } from 'next/router'
import * as React from 'react'
import { ColorModeToggle } from '../layout/ColorModeToggle'

const Header: React.FC = () => {
  const router = useRouter()
  const { data, loading } = useMeQuery({ ssr: false })
  const [logout, { client }] = useLogoutMutation()
  if (loading) return null

  return (
    <Flex
      as='header'
      minW='100%'
      mb={8}
      align='center'
      borderBottom='1px'
      borderBottomStyle='solid'
      borderBottomColor='gray.200'
      height='60px'
    >
      <Flex minW='100%' as='nav' justify='space-evenly'>
        {data && data?.me?.username ? (
          <Menu>
            <TestModal />

            {/* SUBMIT MENU */}
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

            {/* PROFILE MENU  */}
            <Menu>
              <MenuButton as={Button}>{data.me.username}</MenuButton>
              <MenuList>
                <MenuGroup title='Settings'>
                  <MenuItem onClick={() => router.push('/settings/profile')}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={() => router.push('/settings/account')}>
                    Account
                  </MenuItem>
                  <MenuItem onClick={() => router.push('/settings')}>
                    General
                  </MenuItem>
                </MenuGroup>
                <MenuItem
                  mr={2}
                  color='red.500'
                  onClick={async () => {
                    await logout()
                    await client.resetStore()
                  }}
                >
                  {' '}
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
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
      </Flex>
    </Flex>
  )
}

export default Header
