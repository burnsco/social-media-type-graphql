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
import CreateImageOrVideoPost from './image-video-post'
import CreateLinkPost from './link-post'
import CreateRegularPost from './normal-post'
import CreateSubreddit from './subreddit'

const CreatePostPage: React.FunctionComponent = () => {
  return (
    <Layout>
      <Heading>Creation Page ( Post & Subreddit )</Heading>
      <Tabs>
        <TabList>
          <Tab>Post</Tab>
          <Tab>Link</Tab>
          <Tab>Images & Video</Tab>
          <Tab>Subreddit</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <CreateRegularPost />
          </TabPanel>

          <TabPanel>
            <CreateLinkPost />
          </TabPanel>

          <TabPanel>
            <CreateImageOrVideoPost />
          </TabPanel>

          <TabPanel>
            <CreateSubreddit />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  )
}

export default CreatePostPage
