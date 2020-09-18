import {
  Avatar,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Tooltip
} from '@chakra-ui/core'
import { ColorModeToggle } from '@components/Layout/ColorModeToggle'
import { useLogoutMutation, useMeQuery } from '@generated/graphql'
import { useRouter } from 'next/router'
import * as React from 'react'
import { BsFolderPlus } from 'react-icons/bs'
import { FcReddit } from 'react-icons/fc'
import { HiOutlineMail } from 'react-icons/hi'
import { ImPencil2 } from 'react-icons/im'

const Header: React.FC = () => {
  const router = useRouter()
  const { data, loading } = useMeQuery()
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
      <Flex minW='100%' as='nav' justify='flex-end'>
        <IconButton
          onClick={() => router.push('/')}
          variant='ghost'
          color='current'
          aria-label='Home'
          icon={<FcReddit />}
        />
        {data && data?.me?.username ? (
          <Menu>
            <ButtonGroup spacing='4' mr='4'>
              <Tooltip hasArrow label='Submit Post' bg='gray.200' color='black'>
                <IconButton
                  onClick={() => router.push('/submit')}
                  variant='ghost'
                  color='current'
                  aria-label='Submit Post'
                  icon={<ImPencil2 />}
                />
              </Tooltip>

              <Tooltip
                hasArrow
                label='Create Subreddit'
                bg='gray.200'
                color='black'
              >
                <IconButton
                  variant='ghost'
                  color='current'
                  aria-label='Create Subreddit'
                  icon={<BsFolderPlus />}
                />
              </Tooltip>

              <Tooltip
                hasArrow
                label='Send Message'
                bg='gray.200'
                color='black'
              >
                <IconButton
                  variant='ghost'
                  color='current'
                  aria-label='Send Message'
                  icon={<HiOutlineMail />}
                />
              </Tooltip>
            </ButtonGroup>
            <Menu>
              <MenuButton
                as={Button}
                width='200px'
                rightIcon={
                  <Avatar
                    size='xs'
                    name='Ryan Florence'
                    src='https://bit.ly/ryan-florence'
                  />
                }
                variant='outline'
              >
                {data.me.username}
              </MenuButton>
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
