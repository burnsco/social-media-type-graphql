import { TabPanel } from "@chakra-ui/core"
import { ChakraField } from "./ChakraField"

export const TabWrapper: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  return (
    <TabPanel>
      <ChakraField
        label=""
        id="title"
        placeholder="title"
        aria-placeholder="post title"
        name="title"
      />
      {children}
    </TabPanel>
  )
}
