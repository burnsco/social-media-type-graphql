import { useCategoriesQuery } from "@/generated/graphql"
import { Flex, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"

function HeaderNavigation() {
  const { loading, data } = useCategoriesQuery()

  if (!loading && data && data.categories) {
    return (
      <Flex flexGrow={2} mr={5}>
        <Menu>
          <MenuButton>Menu</MenuButton>
          <MenuList>
            <MenuItem>Download</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    )
  }
  return null
}

export default HeaderNavigation
