import {
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from "@chakra-ui/core"
import * as React from "react"
import AccountSettingsPage from "./account"
import ProfileSettingsPage from "./profile"

const SettingsPage: React.FC = () => {
  return (
    <>
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
    </>
  )
}

export default SettingsPage
