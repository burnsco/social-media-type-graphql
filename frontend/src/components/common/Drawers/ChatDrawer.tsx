import { ChakraField } from "@/components/common/index"
import {
  useCategoriesLazyQuery,
  useMessagesByCategoryLazyQuery
} from "@/generated/graphql"
import { CategorySchema } from "@/types/Category/schemas"
import { CategoryInputType } from "@/types/Category/types"
import {
  Alert,
  Avatar,
  Button,
  chakra,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuOptionGroup,
  Tooltip,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { useEffect, useRef } from "react"
import { BsArrowDown, BsArrowLeft } from "react-icons/bs"
import { FaHome } from "react-icons/fa"
import { IoChatboxEllipsesOutline } from "react-icons/io5"

export default function ChatRoomDrawer() {
  const bg = useColorModeValue("white", "#202020")
  const drawerbg = useColorModeValue("whitesmoke", "gray.900")
  const submitButtonColor = useColorModeValue("purple", "blue")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<HTMLButtonElement | null>(null)

  const [
    fetchMessages,
    { data: messagesData, loading: loadingMessages, error: messagesError }
  ] = useMessagesByCategoryLazyQuery()

  const [
    fetchCategories,
    { data: categoriesData, loading: loadingCategories, error: categoriesError }
  ] = useCategoriesLazyQuery()

  useEffect(() => fetchCategories(), [fetchCategories])

  if (categoriesError) return <Alert>Error Loading Subreddits</Alert>
  if (messagesError) return <Alert>Error loading Messages</Alert>

  const ChatNavigation = () => (
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
              {loadingCategories ? "Loading..." : "Browse Chat Rooms"}
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
                          fetchMessages({ variables: { categoryId: item.id } })
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

  const ChatRoomDisplay = () => (
    <List mt={2} spacing={3}>
      {messagesData && messagesData.messagesByCategory ? (
        <>
          {messagesData.messagesByCategory.map(message => (
            <ListItem key={message.id}>
              <Avatar
                size="xs"
                name="Ryan Florence"
                src="https://bit.ly/ryan-florence"
                mr={3}
              />
              {message.content}
            </ListItem>
          ))}
        </>
      ) : null}
    </List>
  )

  return (
    <>
      <Tooltip
        hasArrow
        label="Chat"
        fontSize="md"
        bg="black"
        color="whitesmoke"
      >
        <chakra.span>
          <IconButton
            onClick={onOpen}
            variant="ghost"
            aria-label="Create a Subreddit"
            icon={<IoChatboxEllipsesOutline size="1.5em" />}
            size="md"
          />
        </chakra.span>
      </Tooltip>
      <Drawer
        scrollBehavior="inside"
        size="xl"
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg={drawerbg}>
          <DrawerCloseButton />
          <DrawerHeader>
            <ChatNavigation />
          </DrawerHeader>
          <Formik
            initialValues={CategoryInputType}
            validationSchema={CategorySchema}
            onSubmit={() => {
              console.log("chat drawer")
            }}
          >
            {({ isSubmitting }) => {
              return (
                <Form>
                  <DrawerBody>
                    <ChatRoomDisplay />
                  </DrawerBody>

                  <DrawerFooter>
                    <HStack w="full">
                      <ChakraField
                        label=""
                        id="name"
                        name="name"
                        placeholder="chat here..."
                      />

                      <Button type="submit" colorScheme={submitButtonColor}>
                        Submit
                      </Button>
                    </HStack>
                  </DrawerFooter>
                </Form>
              )
            }}
          </Formik>
        </DrawerContent>
      </Drawer>
    </>
  )
}
