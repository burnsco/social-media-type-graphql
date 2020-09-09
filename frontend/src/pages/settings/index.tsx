import * as React from 'react'

import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea
} from '@chakra-ui/core'
import Layout from '@components/layout'

const SettingsPage = () => {
  return (
    <Layout>
      <Heading mb={2}>User settings</Heading>
      <Tabs>
        <TabList>
          <Tab>Account</Tab>
          <Tab>Profile</Tab>
          <Tab>Chat & Messaging</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Heading fontSize='lg'>Account settings</Heading>
            <Text>
              Email address - <Button>Change</Button>
            </Text>
            <Text>
              Change password - <Button>Change</Button>
            </Text>
            <Text>
              Delete Account- <Button>DELETE</Button>
            </Text>
          </TabPanel>
          <TabPanel>
            <Heading fontSize='md'>Customize Profile</Heading>
            <Text> Profile Information</Text>
            <FormControl>
              <FormLabel htmlFor='displayName'>
                Display name (optional)
              </FormLabel>
              <Input
                type='text'
                id='displayName'
                aria-describedby='displayName-helper-text'
              />
              <FormHelperText id='displayName-helper-text'>
                30 characters remaining
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='aboutMe'>About (optional)</FormLabel>
              <Textarea id='aboutMe' aria-describedby='aboutMe-helper-text' />
              <FormHelperText id='aboutMe-helper-text'>
                200 characters remaining
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='email'>Avatar and Banner Image</FormLabel>
              <Input
                type='text'
                id='displayname'
                aria-describedby='email-helper-text'
              />
              <FormHelperText id='email-helper-text'>
                30 characters remaining
              </FormHelperText>
            </FormControl>
          </TabPanel>
          <TabPanel>
            <Heading>delete account</Heading>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  )
}

export default SettingsPage
