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
  useColorModeValue
} from "@chakra-ui/react"
import React from "react"
import { useUsersQueryQuery } from "../../../generated/graphql"

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

const SideMenuContainer = () => {
  const bg = useColorModeValue("white", "#202020")

  const { data, loading } = useUsersQueryQuery()

  return (
    <Box
      bg={bg}
      minW="200px"
      maxW="260px"
      borderWidth="1px"
      overflow="hidden"
      boxShadow="xs"
    >
      <Box h="100%" w="100%">
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  SUBREDDITS
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  FRIENDS
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <List mt={2} spacing={3}>
                {data?.users.map(user => (
                  <ListItem key={`friends-list-${user.id}`}>
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
              </List>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  MESSAGES
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Box>
  )
}

export default SideMenuContainer
