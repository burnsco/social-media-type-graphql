import { useCategoriesLazyQuery } from "@/generated/graphql"
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList
} from "@chakra-ui/core"
import { useRouter } from "next/router"
import React from "react"
import { FaHome } from "react-icons/fa"
import { ImArrowDown } from "react-icons/im"
import RegisterDrawer from "../shared/Drawer"

const HomeSearch = () => {
  const router = useRouter()

  const [
    lazyCategoriesQuery,
    { loading, error, data }
  ] = useCategoriesLazyQuery({ fetchPolicy: "cache-and-network" })

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
          maxW="250px"
          fontSize="sm"
          textAlign="left"
          w="full"
          leftIcon={<FaHome />}
          rightIcon={<ImArrowDown />}
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
        <RegisterDrawer />
      </Menu>
    </Flex>
  )
}

export default HomeSearch
