import { useCategoriesQuery } from "@/generated/graphql"
import {
  Button,
  Flex,
  FormControl,
  Input,
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
import { ChangeEvent, useState } from "react"
import { FaHome } from "react-icons/fa"
import { ImArrowDown } from "react-icons/im"

function HeaderNavigation() {
  const router = useRouter()

  const [filter, setFilter] = useState("")

  const { loading, error, data, refetch } = useCategoriesQuery({
    variables: { name: filter }
  })

  const bg = useColorModeValue("white", "#202020")

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value)
    refetch()
  }

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
            <FormControl id="filteredCategories">
              <Input onChange={handleChange} placeholder="Filter" size="sm" />
            </FormControl>
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
