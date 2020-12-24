import { ChakraField } from "@/components/common/index"
import { TabPanel } from "@chakra-ui/core"

export const RegularPost = () => (
  <TabPanel>
    <ChakraField
      label=""
      id="title"
      placeholder="title"
      aria-placeholder="post Title"
      name="title"
    />
    <ChakraField
      label=""
      id="text"
      placeholder="text"
      aria-placeholder="post Text"
      name="text"
    />
  </TabPanel>
)

export const LinkPost = () => (
  <TabPanel>
    <ChakraField
      label=""
      id="title"
      name="title"
      placeholder="title"
      aria-placeholder="Post Title"
    />
    <ChakraField
      label=""
      id="link"
      name="link"
      placeholder="link"
      aria-placeholder="Post Link"
    />
  </TabPanel>
)

export const MediaPost = () => (
  <TabPanel>
    <ChakraField
      label=""
      id="title"
      name="title"
      placeholder="title"
      aria-placeholder="Post Title"
    />
    <ChakraField
      label=""
      id="image"
      name="image"
      placeholder="image"
      aria-placeholder="Post Image"
    />
    <ChakraField
      label=""
      id="video"
      name="video"
      placeholder="video"
      aria-placeholder="Post Video"
    />
  </TabPanel>
)
