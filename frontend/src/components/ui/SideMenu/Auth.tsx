import { Accordion } from "@chakra-ui/react"
import React from "react"
import FriendsAndMessagesAccordion from "./FriendsMessages"
import SubredditsAccordion from "./Subreddits"

export default function AuthorizedSideMenu() {
  return (
    <Accordion allowToggle>
      <SubredditsAccordion />
      <FriendsAndMessagesAccordion />
    </Accordion>
  )
}
