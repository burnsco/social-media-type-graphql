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

const CreatePostPage: React.FunctionComponent<{}> = () => {
  return (
    <Layout>
      <Heading>CreatePostPage Page</Heading>
      <Tabs>
        <TabList>
          <Tab>Post</Tab>
          <Tab>Images & Video</Tab>
          <Tab>Link</Tab>
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

export default CreatePostPage
