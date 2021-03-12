import { ChakraField } from "@/components/common/index"
import { CategorySchema } from "@/types/Category/schemas"
import { CategoryInputType } from "@/types/Category/types"
import {
  Button,
  chakra,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  IconButton,
  List,
  ListIcon,
  ListItem,
  Tooltip,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react"
import { Form, Formik } from "formik"
import React, { useRef } from "react"
import { IoChatboxEllipsesOutline } from "react-icons/io5"
import { MdCheckCircle, MdSettings } from "react-icons/md"

export default function ChatRoomDrawer() {
  const submitButtonColor = useColorModeValue("purple", "blue")
  const { isOpen, onOpen, onClose } = useDisclosure()

  const btnRef = useRef<HTMLButtonElement | null>(null)

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
        <DrawerContent bg={useColorModeValue("whitesmoke", "gray.900")}>
          <DrawerCloseButton />
          <DrawerHeader>CHAT</DrawerHeader>
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
                    <List mt={2} spacing={3}>
                      <ListItem>
                        <ListIcon as={MdCheckCircle} color="green.500" />
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                      </ListItem>
                      <ListItem>
                        <ListIcon as={MdCheckCircle} color="green.500" />
                        Assumenda, quia temporibus eveniet a libero incidunt
                        suscipit
                      </ListItem>
                      <ListItem>
                        <ListIcon as={MdCheckCircle} color="green.500" />
                        Quidem, ipsam illum quis sed voluptatum quae eum fugit
                        earum
                      </ListItem>
                      {/* You can also use custom icons from react-icons */}
                      <ListItem>
                        <ListIcon as={MdSettings} color="green.500" />
                        Quidem, ipsam illum quis sed voluptatum quae eum fugit
                        earum
                      </ListItem>
                      <ListItem>
                        <ListIcon as={MdCheckCircle} color="green.500" />
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                      </ListItem>
                      <ListItem>
                        <ListIcon as={MdCheckCircle} color="green.500" />
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                      </ListItem>
                      <ListItem>
                        <ListIcon as={MdCheckCircle} color="green.500" />
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                      </ListItem>
                      <ListItem>
                        <ListIcon as={MdCheckCircle} color="green.500" />
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                      </ListItem>
                      <ListItem>
                        <ListIcon as={MdCheckCircle} color="green.500" />
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                      </ListItem>
                      <ListItem>
                        <ListIcon as={MdCheckCircle} color="green.500" />
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                      </ListItem>
                      <ListItem>
                        <ListIcon as={MdCheckCircle} color="green.500" />
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                      </ListItem>
                    </List>
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
