import {
  Heading,
  Select,
  Stack,
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

const CreatePostPage: React.FunctionComponent = () => {
  return (
    <Layout>
      <Stack spacing={5}>
        <Heading size='lg' fontStyle='italic'>
          Create a Post
        </Heading>
        <Select placeholder='Choose a community' size='lg' width='50%'>
          <option value='option1'>Option 1</option>
          <option value='option2'>Option 2</option>
          <option value='option3'>Option 3</option>
        </Select>
        <Tabs isFitted variant='enclosed'>
          <TabList>
            <Tab>Post</Tab>
            <Tab>Link</Tab>
            <Tab>Images & Video</Tab>
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
          </TabPanels>
        </Tabs>
      </Stack>
    </Layout>
  )
}

export default CreatePostPage
