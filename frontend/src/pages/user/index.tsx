import { Box, Heading, Tab, TabList, TabPanels, Tabs } from "@chakra-ui/core"
import * as React from "react"
import { UserProfileComments } from "./UserProfileComments"
import { UserProfileOverview } from "./UserProfileOverview"
import { UserProfilePosts } from "./UserProfilePosts"

const UserProfilePage: React.FunctionComponent = () => {
  return (
    <Box>
      <Heading>Profile Page</Heading>
      <Tabs>
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Posts</Tab>
          <Tab>Comments</Tab>
        </TabList>

        <TabPanels>
          <UserProfileOverview />
          <UserProfilePosts />
          <UserProfileComments />
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default UserProfilePage
