import {
  FormControl,
  FormLabel,
  Heading,
  Select,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from "@chakra-ui/core"
import { useCategoriesQuery } from "@generated/graphql"
import * as React from "react"
import CreateImageOrVideoPost from "./ImageVideoPost"
import CreateLinkPost from "./LinkPost"
import CreateRegularPost from "./NormalPost"
import CreateSubreddit from "./Subreddit"

const SubmitPage: React.FunctionComponent = () => {
  const { data, loading, error } = useCategoriesQuery()

  if (loading) return null

  if (error) {
    console.log(error)
    return <div>Error Loading Subreddits</div>
  }

  return (
    <Stack spacing={5}>
      <Heading size="lg" fontStyle="italic">
        Create a Post
      </Heading>
      <FormControl>
        <FormLabel htmlFor="category">Subreddit</FormLabel>
        <Select
          id="category"
          placeholder="Choose a community"
          size="lg"
          width="50%"
        >
          {data?.categories.map(subreddit => (
            <option
              key={`subreddit-${subreddit.name}-sidemenu`}
              value={subreddit.name}
            >
              {subreddit.name}
            </option>
          ))}
        </Select>
        <Tabs isFitted variant="enclosed">
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
      </FormControl>
    </Stack>
  )
}

export default SubmitPage
