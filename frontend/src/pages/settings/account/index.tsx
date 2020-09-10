import { Button, Heading, TabPanel, Text } from '@chakra-ui/core'
import * as React from 'react'

export const AccountSettingsPage = () => (
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
)
