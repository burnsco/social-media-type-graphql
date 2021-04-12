import { useMyChatRoomsLazyQuery } from "@/generated/graphql"
import { selectedChatRoomId, selectedChatRoomName } from "@/lib/apolloClient"
import {
  chakra,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Tab,
  TabList,
  Tabs,
  Tooltip,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react"
import React, { useEffect, useRef } from "react"
import { IoChatboxEllipsesOutline } from "react-icons/io5"
import ChatDisplay from "./ChatDisplay"
import ChatInput from "./ChatInput"
import ChatSelection from "./ChatSelect"
import ChatUsers from "./ChatUsers"

export default function ChatDrawerPage() {
  const drawerbg = useColorModeValue("whitesmoke", "gray.900")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<HTMLButtonElement | null>(null)

  const [fetchMyChatRooms, { data, loading, error }] = useMyChatRoomsLazyQuery({
    ssr: false
  })

  useEffect(() => fetchMyChatRooms(), [fetchMyChatRooms])

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
        size="full"
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent p={1} bg={drawerbg}>
          <DrawerCloseButton />
          <DrawerHeader>
            <ChatSelection />
          </DrawerHeader>

          <DrawerBody p={1} m={0} border="1px solid yellow">
            <Flex w="100%" flexDir="column" h="full">
              <Tabs isFitted variant="enclosed">
                <TabList mb="1em">
                  {data && data.myChatRooms ? (
                    <>
                      {data.myChatRooms.map(chatroom => (
                        <Tab
                          key={`My Joined Channel ${chatroom.name}`}
                          onClick={() => {
                            selectedChatRoomId(Number(chatroom.id))
                            selectedChatRoomName(chatroom.name)
                          }}
                        >
                          {chatroom.name}
                        </Tab>
                      ))}
                    </>
                  ) : null}
                </TabList>
              </Tabs>
              <Flex w="full" h="full">
                <ChatDisplay />
                <ChatUsers />
              </Flex>
            </Flex>
          </DrawerBody>

          <DrawerFooter border="2px solid purple" p={0}>
            <ChatInput />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
