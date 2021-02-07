import NavigationDrawer from "@/components/common/Drawers/NavigationDrawer"
import { Flex } from "@chakra-ui/react"

function HeaderNavigation() {
  return (
    <Flex
      display={["block", "block", "none", "none"]}
      flexGrow={2}
      w={120}
      mr={5}
    >
      <NavigationDrawer />
    </Flex>
  )
}

export default HeaderNavigation
