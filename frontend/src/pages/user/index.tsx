import {
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/core"
import Layout from "@components/layout"
import * as React from "react"

const UserProfilePage: React.FunctionComponent<{}> = () => {
  return (
    <Layout>
      <Heading>Profile Page</Heading>
      <Tabs>
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Posts</Tab>
          <Tab>Comments</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  )
}

export default UserProfilePage
