import {
  Box,
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
  Textarea
} from "@chakra-ui/core"
import * as React from "react"

const SettingsPage: React.FC = () => {
  return (
    <Box>
      <Heading mb={2}>User settings</Heading>
      <Tabs>
        <TabList>
          <Tab>Account</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <FormControl>
              <FormLabel htmlFor="displayName">
                Display name (optional)
              </FormLabel>
              <Input
                type="text"
                id="displayName"
                aria-describedby="displayName-helper-text"
              />
              <FormHelperText id="displayName-helper-text">
                30 characters remaining
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="aboutMe">About (optional)</FormLabel>
              <Textarea id="aboutMe" aria-describedby="aboutMe-helper-text" />
              <FormHelperText id="aboutMe-helper-text">
                200 characters remaining
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Avatar and Banner Image</FormLabel>
              <Input
                type="text"
                id="displayname"
                aria-describedby="email-helper-text"
              />
              <FormHelperText id="email-helper-text">
                30 characters remaining
              </FormHelperText>
            </FormControl>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default SettingsPage
