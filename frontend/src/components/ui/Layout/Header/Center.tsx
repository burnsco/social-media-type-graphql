import { useCategoriesQuery } from "@/generated/graphql"
import { Flex, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/core"

function HeaderNavigation() {
  const { loading, data } = useCategoriesQuery()

  if (!loading && data && data.categories) {
    return (
      <Flex flexGrow={2} mr={5}>
        <Menu>
          <MenuButton>Menu</MenuButton>
          <MenuList>
            <MenuItem>Download</MenuItem>
            <MenuItem onClick={() => alert("Kagebunshin")}>
              Create a Copy
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    )
  }
  return null
}

export default HeaderNavigation
