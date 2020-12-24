import { useCategoriesQuery } from "@/generated/graphql"
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  useColorModeValue
} from "@chakra-ui/core"
import { useRouter } from "next/router"
import { FaHome } from "react-icons/fa"
import { ImArrowDown } from "react-icons/im"

function HeaderNavigation() {
  const router = useRouter()

  const { loading, data } = useCategoriesQuery()

  const bg = useColorModeValue("white", "#202020")

  if (loading) return null

  return (
    <Flex flexGrow={2}>
      <Menu closeOnSelect={false}>
        <MenuButton
          as={Button}
          mr={4}
          maxW="280px"
          fontSize="sm"
          textAlign="left"
          w="full"
          leftIcon={<FaHome />}
          rightIcon={<ImArrowDown />}
          variant="outline"
        >
          Home
        </MenuButton>
        {data && data.categories && (
          <MenuList minWidth="240px" opacity="0.7" bg={bg}>
            <MenuOptionGroup defaultValue="asc" title="Order" type="radio">
              <MenuItemOption value="asc">Ascending</MenuItemOption>
              <MenuItemOption value="desc">Descending</MenuItemOption>
            </MenuOptionGroup>

            <MenuDivider />

            <MenuOptionGroup title="categories">
              {data.categories.map((item, i) => (
                <MenuItem
                  value={item.name}
                  key={`subreddit-center-menu-${item.id}-${i}`}
                  onClick={() => router.push(`/r/${item.name}`)}
                >
                  {item.name}
                </MenuItem>
              ))}
            </MenuOptionGroup>
          </MenuList>
        )}
      </Menu>
    </Flex>
  )
}

export default HeaderNavigation
