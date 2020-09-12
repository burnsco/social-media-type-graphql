import { Heading, Tab, TabList, TabPanels, Tabs } from '@chakra-ui/core'
import Layout from '@components/Layout'
import * as React from 'react'
import { UserProfileComments } from './UserProfileComments'
import { UserProfileOverview } from './UserProfileOverview'
import { UserProfilePosts } from './UserProfilePosts'

const UserProfilePage: React.FunctionComponent = () => {
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
          <UserProfileOverview />
          <UserProfilePosts />
          <UserProfileComments />
        </TabPanels>
      </Tabs>
    </Layout>
  )
}

export default UserProfilePage
