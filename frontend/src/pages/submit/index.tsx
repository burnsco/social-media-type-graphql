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
import SubmitNormalPostPage from './normal-post'

const CreatePostPage: React.FunctionComponent = () => {
  return (
    <Layout>
      <Heading>Create Post Page</Heading>
      <Tabs>
        <TabList>
          <Tab>Post</Tab>
          <Tab>Images & Video</Tab>
          <Tab>Link</Tab>
          <Tab>Subreddit</Tab>
        </TabList>

        <TabPanels>
          <SubmitNormalPostPage />
          <TabPanel>
            <p>Image and Video Inputs</p>
          </TabPanel>
          <TabPanel>
            <p>Link Inputs</p>
          </TabPanel>
          <TabPanel>
            <p>Subreddit Inputs</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  )
}

export default CreatePostPage
