import {
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from '@chakra-ui/core'
import Layout from '@components/Layout'
import * as React from 'react'

const CreatePostPage: React.FunctionComponent = () => {
  return (
    <Layout>
      <Heading>Create Post Page</Heading>
      <Tabs>
        <TabList>
          <Tab>Post</Tab>
          <Tab>Images & Video</Tab>
          <Tab>Link</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>Post Inputs</p>
          </TabPanel>
          <TabPanel>
            <p>Image and Video Inputs</p>
          </TabPanel>
          <TabPanel>
            <p>Link Inputs</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  )
}

export default CreatePostPage
