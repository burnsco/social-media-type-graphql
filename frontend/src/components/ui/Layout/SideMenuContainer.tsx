import { useMyFriendsAndMessagesQuery } from "@/generated/graphql"
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
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

  const FriendsAcccordion = () => (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            FRIENDS
          </Box>
          {!loading ? <AccordionIcon /> : <ImSpinner />}
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <List mt={2} spacing={3}>
          {data && data.loggedInUser ? (
            <>
              {data.loggedInUser.friends.map(user => (
                <ListItem key={`friends-list-${user.username}`}>
                  <Avatar
                    size="xs"
                    name="Ryan Florence"
                    src="https://bit.ly/ryan-florence"
                    mr={3}
                  />
                  {user.username}{" "}
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

  const MessagesAccordion = () => (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            MESSAGES
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

  return (
    <Skeleton isLoaded={!loading}>
      <Box
        onClick={() => refetch()}
        bg={bg}
        minW="200px"
        maxW="260px"
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
