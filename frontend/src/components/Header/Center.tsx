import { useCategoriesQuery } from "@/generated/graphql"
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  useColorModeValue
} from "@chakra-ui/core"
import { useRouter } from "next/router"
import { FaHome } from "react-icons/fa"
import { ImArrowDown } from "react-icons/im"

function HeaderNavigation() {
  const router = useRouter()
  const bg = useColorModeValue("white", "#202020")
  const { data, loading, error } = useCategoriesQuery()

  if (!loading && data && data.categories && !error) {
    return (
      <Flex flexGrow={2}>
        <Menu>
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
            <MenuList opacity="0.7" bg={bg}>
              <MenuGroup>
                {data.categories.map(item => (
                  <MenuItem
                    key={`subreddit-menu-${item.id}`}
                    onClick={() => router.push(`/r/${item.name}`)}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </MenuGroup>
            </MenuList>
          )}
        </Menu>
      </Flex>
    )
  }
  return null
}

export default HeaderNavigation
