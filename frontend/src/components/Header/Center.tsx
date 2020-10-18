import { useCategoriesLazyQuery } from "@/generated/graphql"
import {
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList
} from "@chakra-ui/core"
import { useRouter } from "next/router"
import React from "react"
import { BsSearch } from "react-icons/bs"
import { FaHome } from "react-icons/fa"
import { ImArrowDown, ImHappy } from "react-icons/im"

const HomeSearch = () => {
  const router = useRouter()
  const [
    lazyCategoriesQuery,
    { loading, error, data }
  ] = useCategoriesLazyQuery()
  if (loading) return null
  if (error) {
    console.log(error)
  }

  return (
    <Flex
      onMouseOver={() => {
        lazyCategoriesQuery()
      }}
      justify="space-around"
      flexGrow={2}
    >
      <Menu>
        <MenuButton
          as={Button}
          mr={4}
          textAlign="left"
          w="full"
          leftIcon={<FaHome />}
          rightIcon={!loading ? <ImArrowDown /> : <ImHappy />}
          variant="outline"
        >
          Home
        </MenuButton>
        {data && (
          <>
            <MenuList opacity="0.9">
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
          </>
        )}
      </Menu>
      <InputGroup flexGrow={1} maxW="300px">
        <InputLeftElement pointerEvents="none">
          <Icon as={BsSearch} boxSize={4} />
        </InputLeftElement>
        <Input placeholder="Search" />
      </InputGroup>
    </Flex>
  )
}

export default HomeSearch
