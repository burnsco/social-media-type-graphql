import MessageUser from "@/components/common/MessageUser"
import { useMyFriendsAndMessagesQuery } from "@/generated/graphql"
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Badge,
  Box,
  chakra,
  List,
  ListItem,
  Skeleton,
  useColorModeValue
} from "@chakra-ui/react"
import React from "react"
import { ImSpinner } from "react-icons/im"

const OnlineCircle = () => (
  <chakra.span
    h="10px"
    w="10px"
    ml={2}
    bgColor="green.400"
    borderRadius="50%"
    display="inline-block"
  />
)

const OfflineCircle = () => (
  <chakra.span
    h="10px"
    w="10px"
    ml={2}
    bgColor="red.400"
    borderRadius="50%"
    display="inline-block"
  />
)

export default function SideMenuContainer() {
  const bg = useColorModeValue("white", "#202020")
  const { data, loading, refetch } = useMyFriendsAndMessagesQuery()

  console.log("friendsAndMessages")
  console.log(data)

  const FriendsCount = () => {
    if (data && data.me && data.me.friends.length > 0) {
      const onlineFriends = data.me.friends.map(friend => friend.online).length
      const offlineFriends = data.me.friends.map(friend => !friend.online)
        .length
      return (
        <Badge ml={1} colorScheme="green">
          {onlineFriends}
        </Badge>
      )
    }
    return null
  }

  const MessagesCount = () => {
    if (data && data.me && data.me.privateMessages.length > 0) {
      const privateMessagesCount = data.me.privateMessages.length
      return (
        <Badge ml={1} colorScheme="green">
          {privateMessagesCount}
        </Badge>
      )
    }
    return null
  }

  const FriendsAcccordion = () => (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            FRIENDS <FriendsCount />
          </Box>
          {!loading ? <AccordionIcon /> : <ImSpinner />}
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <List mt={2} spacing={3}>
          {data && data.me ? (
            <>
              {data.me.friends.map(user => (
                <ListItem key={`friends-list-${user.username}`}>
                  <Avatar
                    size="xs"
                    name="Ryan Florence"
                    src="https://bit.ly/ryan-florence"
                    mr={3}
                  />
                  {user.username}
                  <MessageUser {...user} />
                  {user.online ? <OnlineCircle /> : <OfflineCircle />}
                </ListItem>
              ))}
            </>
          ) : (
            <ListItem>No Friends Yet</ListItem>
          )}
        </List>
      </AccordionPanel>
    </AccordionItem>
  )

  const SubredditsAccordion = () => (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            SUBREDDITS
          </Box>
          {!loading ? <AccordionIcon /> : <ImSpinner />}
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </AccordionPanel>
    </AccordionItem>
  )

  // #TODO figure out UI/Logic for messages
  // ie. each user has own box (like friends) and all messages
  // are contained within that
  // may have to change backend schema, or something...need all messages
  // in one box, per user

  const MessagesAccordion = () => (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            MESSAGES <MessagesCount />
          </Box>
          {!loading ? <AccordionIcon /> : <ImSpinner />}
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <List mt={2} spacing={3}>
          {data && data.me && data.me.privateMessages ? (
            <>
              {data.me.privateMessages.map(message => {
                let myFriend
                if (message.sentBy.username !== data.me.username) {
                  myFriend = message.sentBy.username
                }
                myFriend = message.sentTo.username
                return (
                  <ListItem key={`messages-list-${message.id}`}>
                    <Avatar
                      size="xs"
                      name="Ryan Florence"
                      src="https://bit.ly/ryan-florence"
                      mr={3}
                    />
                    {myFriend}
                  </ListItem>
                )
              })}
            </>
          ) : (
            <ListItem>No Friends Yet</ListItem>
          )}
        </List>
      </AccordionPanel>
    </AccordionItem>
  )

  // #TODO figure out UI/Logic for messages
  // ie. each user has own box (like friends) and all messages
  // are contained within that

  return (
    <Skeleton isLoaded={!loading}>
      <Box
        onClick={() => refetch()}
        bg={bg}
        minW="200px"
        maxW="300px"
        borderY="none"
        borderWidth="1px"
        overflow="hidden"
        boxShadow="xs"
      >
        <Accordion>
          <SubredditsAccordion />
          <FriendsAcccordion />
          <MessagesAccordion />
        </Accordion>
      </Box>
    </Skeleton>
  )
}
