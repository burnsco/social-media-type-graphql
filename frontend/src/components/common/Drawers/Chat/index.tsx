import {
  chakra,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tooltip,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react"
import React, { useRef } from "react"
import { IoChatboxEllipsesOutline } from "react-icons/io5"
import ChatDisplay from "./ChatDisplay"
import ChatInput from "./ChatInput"
import ChatSelection from "./ChatSelect"
import ChatUsers from "./ChatUsers"

export default function ChatDrawerPage() {
  const drawerbg = useColorModeValue("whitesmoke", "gray.900")
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
            aria-label="Open Chat Menu"
            icon={<IoChatboxEllipsesOutline size="1.5em" />}
            size="md"
          />
        </chakra.span>
      </Tooltip>
      <Drawer
        scrollBehavior="inside"
        size="full"
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg={drawerbg}>
          <DrawerCloseButton />
          <DrawerHeader>
            <ChatSelection />
            <Tabs isFitted variant="enclosed">
              <TabList mb="1em">
                <Tab> </Tab>
                <Tab>Two</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <ChatUsers />
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </DrawerHeader>

          <DrawerBody>
            <ChatDisplay />
          </DrawerBody>

          <DrawerFooter>
            <ChatInput />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
