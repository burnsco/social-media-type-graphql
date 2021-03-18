import { useCategoriesLazyQuery } from "@/generated/graphql"
import { selectedChatRoomId, selectedChatRoomName } from "@/lib/apolloClient"
import { useReactiveVar } from "@apollo/client"
import {
  Alert,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuOptionGroup,
  useColorModeValue
} from "@chakra-ui/react"
import React, { useEffect } from "react"
import { BsArrowDown, BsArrowLeft } from "react-icons/bs"
import { FaHome } from "react-icons/fa"

export default function ChatSelection() {
  const bg = useColorModeValue("white", "#202020")

  const selectedCategoryId = useReactiveVar(selectedChatRoomId)
  const selectedCategoryName = useReactiveVar(selectedChatRoomName)

  const [
    fetchCategories,
    { data: categoriesData, loading: loadingCategories, error: categoriesError }
  ] = useCategoriesLazyQuery()

  useEffect(() => fetchCategories(), [fetchCategories])

  if (!categoriesError) {
    return (
      <Flex flexGrow={2}>
        <Menu closeOnSelect={true}>
          {({ isOpen }) => (
            <>
              <MenuButton
                as={Button}
                mr={4}
                maxW="280px"
                fontSize="sm"
                textAlign="left"
                w="full"
                leftIcon={<FaHome />}
                rightIcon={isOpen ? <BsArrowDown /> : <BsArrowLeft />}
                variant="outline"
              >
                {loadingCategories ? "Loading..." : selectedCategoryName}
              </MenuButton>
              {categoriesData && categoriesData.categories && (
                <MenuList minWidth="240px" opacity="0.7" bg={bg}>
                  <MenuOptionGroup title="subreddits">
                    {categoriesData.categories.map((item, i) => (
                      <MenuItem
                        value={item.name}
                        key={`subreddit-center-menu-${item.id}-${i}`}
                        onClick={() => {
                          if (item && item.name && item.id) {
                            selectedChatRoomId(item.id)
                            selectedChatRoomName(item.name)
                          }
                        }}
                      >
                        {item.name}
                      </MenuItem>
                    ))}
                  </MenuOptionGroup>
                </MenuList>
              )}
            </>
          )}
        </Menu>
      </Flex>
    )
  }
  return <Alert>Error Loading Subreddits</Alert>
}
