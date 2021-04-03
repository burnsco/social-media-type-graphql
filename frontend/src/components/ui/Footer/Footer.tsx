import MessageUser from "@/components/common/MessageUser"
import { OfflineCircle, OnlineCircle } from "@/components/common/OnlineOffline"
import { useMyFriendsAndMessagesQuery } from "@/generated/graphql"
import {
  Avatar,
  Badge,
  Button,
  chakra,
  Flex,
  Heading,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Spacer,
  useColorModeValue
} from "@chakra-ui/react"
import React from "react"
import { FaUserFriends } from "react-icons/fa"
import { ImSpinner } from "react-icons/im"

export default function Footer() {
  const bg = useColorModeValue("white", "#202020")

  const { data, loading, refetch } = useMyFriendsAndMessagesQuery()

  const FriendsCount = () => {
    if (data && data.me && data.me.friends.length > 0) {
      const onlineFriends = data.me.friends.map(friend => friend.online).length

      return (
        <Badge mr={2} colorScheme="green">
          {onlineFriends}
        </Badge>
      )
    }
    return null
  }

  const NewPrivateMessagePopOver = (message: any) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const open = () => setIsOpen(!isOpen)
    const close = () => setIsOpen(false)
    const ref = React.useRef<HTMLInputElement | null>(null)
    return (
      <>
        <Popover initialFocusRef={ref} placement="bottom" closeOnBlur={false}>
          <PopoverTrigger>
            <Button onClick={open}>
              {message.sentBy.username !== data?.me?.username
                ? message.sentBy.username
                : message.sentTo.username}
            </Button>
          </PopoverTrigger>

          <PopoverContent>
            <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody minH="100px">
              Bob: so what's up today man!?
            </PopoverBody>
            <PopoverFooter d="flex" justifyContent="flex-end">
              <Input ref={ref} />
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </>
    )
  }

  const FriendsMenu = () => (
    <>
      {data && data.me ? (
        <Menu>
          <MenuButton
            onClick={() => refetch()}
            as={Button}
            rightIcon={!loading ? <FaUserFriends /> : <ImSpinner />}
          >
            <FriendsCount />
            FRIENDS
          </MenuButton>
          <MenuList>
            {data?.me?.friends.map(user => (
              <MenuItem key={`friend-${user.id}`}>
                <Avatar
                  size="xs"
                  name="Ryan Florence"
                  src="https://bit.ly/ryan-florence"
                  mr={3}
                />
                {user.username} {user && <MessageUser {...user} />}
                {user.online ? <OnlineCircle /> : <OfflineCircle />}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      ) : (
        <Heading>No Friends</Heading>
      )}
    </>
  )

  const ChatMenu = () => (
    <>
      {data && data.me ? (
        <Menu>
          <MenuButton
            onClick={() => refetch()}
            as={Button}
            rightIcon={!loading ? <FaUserFriends /> : <ImSpinner />}
          >
            <FriendsCount />
            CHAT
          </MenuButton>
          <MenuList>
            {data?.me?.friends.map(user => (
              <MenuItem key={`friend-${user.id}`}>
                <Avatar
                  size="xs"
                  name="Ryan Florence"
                  src="https://bit.ly/ryan-florence"
                  mr={3}
                />
                {user.username} {user && <MessageUser {...user} />}
                {user.online ? <OnlineCircle /> : <OfflineCircle />}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      ) : (
        <Heading>No Friends</Heading>
      )}
    </>
  )

  const FooterContent = () => (
    <Flex w="100%" h="100%">
      <ChatMenu />
      <Spacer />
      <FriendsMenu />
    </Flex>
  )

  return (
    <chakra.header
      pos="fixed"
      bottom="0"
      zIndex="1"
      bg={bg}
      left="0"
      right="0"
      width="full"
    >
      <chakra.div height="2.5rem" mx="auto" maxW="1200px" px={1}>
        <FooterContent />
      </chakra.div>
    </chakra.header>
  )
}
