import { NextChakraLink } from "@/components/common/index"
import {
  useCategoriesQuery,
  useMyFriendsAndMessagesQuery
} from "@/generated/graphql"
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
  Input,
  List,
  ListItem,
  Skeleton,
  useColorModeValue
} from "@chakra-ui/react"
import { useRouter } from "next/router"
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
  const router = useRouter()
  const color = useColorModeValue("gray.700", "gray.300")
  const hover = useColorModeValue("black", "white")

  const linkbg = useColorModeValue("#ebedf0", "#3661ed")

  const { data, loading, refetch } = useMyFriendsAndMessagesQuery()
  const {
    data: subreddits,
    loading: loadingSubreddits,
    error: subredditsError,
    refetch: fetchMoreSubreddits
  } = useCategoriesQuery()

  const { category } = router.query

  const FriendsCount = () => {
    if (data && data.me && data.me.friends.length > 0) {
      const onlineFriends = data.me.friends.map(friend => friend.online).length

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

  const SubredditsCount = () => {
    if (
      subreddits &&
      subreddits.categories &&
      subreddits.categories.length > 0
    ) {
      const count = subreddits.categories.length
      return (
        <Badge ml={1} colorScheme="orange">
          {count}
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
        <Accordion allowToggle>
          <List mt={2} spacing={3}>
            {data && data.me ? (
              <>
                {data.me.friends.map(user => (
                  <AccordionItem color="" key={`friends-list-${user.username}`}>
                    <AccordionButton
                      _expanded={{ bg: "lightgrey", borderRadius: 5 }}
                    >
                      <ListItem>
                        <Box flex="1" textAlign="left">
                          {user.username}
                          {user.online ? <OnlineCircle /> : <OfflineCircle />}
                          <AccordionIcon ml={3} />
                        </Box>
                      </ListItem>
                    </AccordionButton>
                    <AccordionPanel pb={2}>
                      <List mt={2} spacing={3}>
                        {data && data.me && data.me.privateMessages ? (
                          <>
                            {data.me.privateMessages.map(message => {
                              if (
                                (message.sentBy.username ||
                                  message.sentTo.username) === data.me.username
                              )
                                return (
                                  <ListItem key={`messages-list-${message.id}`}>
                                    <Avatar
                                      size="xs"
                                      name="Ryan Florence"
                                      src="https://bit.ly/ryan-florence"
                                      mr={3}
                                    />
                                    {message.body}
                                  </ListItem>
                                )

                              return (
                                <ListItem key={`messages-list-${message.id}`}>
                                  {message.body}
                                  <Avatar
                                    size="xs"
                                    name="Ryan Florence"
                                    src="https://bit.ly/ryan-florence"
                                    ml={1}
                                  />
                                </ListItem>
                              )
                            })}
                          </>
                        ) : (
                          <ListItem>No Friends Yet</ListItem>
                        )}
                        <ListItem>
                          <Input placeholder="Type your message" />
                        </ListItem>
                      </List>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </>
            ) : (
              <ListItem>No Friends Yet</ListItem>
            )}
          </List>
        </Accordion>
      </AccordionPanel>
    </AccordionItem>
  )

  const SubredditsAccordion = () => (
    <AccordionItem onMouseOver={() => fetchMoreSubreddits}>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            SUBREDDITS <SubredditsCount />
          </Box>
          {!loadingSubreddits ? <AccordionIcon /> : <ImSpinner />}
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <List mt={2} spacing={3}>
          {subreddits && subreddits.categories ? (
            <>
              {subreddits.categories.map(subreddit => {
                return (
                  <ListItem
                    key={`subreddit-list-${subreddit.id}`}
                    onClick={() => router.push(`/r/${subreddit.name}`)}
                  >
                    <NextChakraLink
                      p={1}
                      fontWeight={category === subreddit.name ? "500" : "400"}
                      color={category === subreddit.name ? hover : color}
                      _hover={{
                        borderRadius: 5,
                        color: hover,
                        bg: linkbg,
                        marginLeft: 1
                      }}
                      href="/r/[category]"
                      as={`/r/${subreddit.name}`}
                    >
                      {subreddit.name}
                    </NextChakraLink>
                  </ListItem>
                )
              })}
            </>
          ) : (
            <ListItem>No Subreddits Yet</ListItem>
          )}
        </List>
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
        <Accordion allowToggle>
          <SubredditsAccordion />
          <FriendsAcccordion />
          <MessagesAccordion />
        </Accordion>
      </Box>
    </Skeleton>
  )
}
