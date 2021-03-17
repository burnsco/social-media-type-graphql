import {
  useCategoriesLazyQuery,
  useNewChatMessageSubscription
} from "@/generated/graphql"
import { selectedChatRoomId, selectedChatRoomName } from "@/lib/apolloClient"
import {
  Alert,
  Button,
  Flex,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuOptionGroup,
  Text,
  useColorModeValue,
  VStack
} from "@chakra-ui/react"
import React, { useEffect } from "react"
import { BsArrowDown, BsArrowLeft } from "react-icons/bs"
import { FaHome } from "react-icons/fa"

export default function ChatSelection() {
  const bg = useColorModeValue("white", "#202020")

  const selectedCategoryId = selectedChatRoomId()
  const selectedCategoryName = selectedChatRoomName()

  const [
    fetchCategories,
    { data: categoriesData, loading: loadingCategories, error: categoriesError }
  ] = useCategoriesLazyQuery()

  useEffect(() => fetchCategories(), [fetchCategories])

  const { data, loading } = useNewChatMessageSubscription({
    variables: { categoryId: selectedCategoryId }
  })

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
        <VStack>
          <Text>Current Room ID = {selectedCategoryId}</Text>
          <Text>Current Room Name = {selectedCategoryName}</Text>
          {!loading && data && data.newMessage ? (
            <>
              <List>
                <ListItem>{data.newMessage.content}</ListItem>
                <ListItem>{data.newMessage.sentBy.username}</ListItem>
              </List>
            </>
          ) : null}
        </VStack>
      </Flex>
    )
  }
  return <Alert>Error Loading Subreddits</Alert>
}
