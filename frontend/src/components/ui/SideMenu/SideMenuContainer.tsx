import { Accordion, Box, useColorModeValue } from "@chakra-ui/react"
import React from "react"
import FriendsAndMessagesAccordion from "./FriendsMessages"
import SubredditsAccordion from "./Subreddits"

export default function AuthorizedSideMenuContainer() {
  const bg = useColorModeValue("white", "#202020")
  return (
    <Box
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
        <FriendsAndMessagesAccordion />
      </Accordion>
    </Box>
  )
}
