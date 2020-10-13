import { Box, Heading, Tab, TabList, TabPanels, Tabs } from "@chakra-ui/core"
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
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default UserProfilePage
