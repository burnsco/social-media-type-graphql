import {
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from '@chakra-ui/core'
import Layout from '@components/layout'
import * as React from 'react'
import { AccountSettingsPage } from './account'
import { ProfileSettingsPage } from './profile'

const SettingsPage = () => (
  <Layout>
    <Heading mb={2}>User settings</Heading>
    <Tabs>
      <TabList>
        <Tab>Account</Tab>
        <Tab>Profile</Tab>
        <Tab>Chat & Messaging</Tab>
      </TabList>

      <TabPanels>
        <ProfileSettingsPage />
        <AccountSettingsPage />
        <TabPanel>
          <Heading>delete account</Heading>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </Layout>
)
