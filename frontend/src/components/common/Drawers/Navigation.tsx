import { NextChakraLink } from "@/components/common/index"
import { useCategoriesLazyQuery } from "@/generated/graphql"
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  List,
  ListItem,
  Skeleton,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { ImArrowDown, ImArrowRight } from "react-icons/im"

export default function NavigationDrawer() {
  const [input, setInput] = useState("")

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [getCategories, { loading, data }] = useCategoriesLazyQuery()

  useEffect(() => {
    getCategories()
  }, [getCategories])

  const btnRef = useRef<HTMLButtonElement | null>(null)

  return (
    <Box border="2px solid orange">
      <Button
        colorScheme="blue"
        size="md"
        flexGrow={2}
        ref={btnRef}
        onClick={onOpen}
        leftIcon={isOpen ? <ImArrowRight /> : <ImArrowDown />}
      >
        NAVIGATION
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg={useColorModeValue("whitesmoke", "gray.900")}>
          <DrawerCloseButton />
          <DrawerHeader>Search Subreddits</DrawerHeader>
          <DrawerBody>
            <Input
              mb={2}
              placeholder="Search subreddits"
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <Skeleton isLoaded={!loading}>
              <List>
                {data && data.categories
                  ? data.categories
                      .filter(c =>
                        c.name.toLowerCase().includes(input.toLowerCase())
                      )
                      .map(cat => (
                        <ListItem p={1} key={`sideNav-${cat.name}-${cat.id}`}>
                          <NextChakraLink
                            p={1}
                            bg={useColorModeValue("translucent", "translucent")}
                            fontWeight="400"
                            color={useColorModeValue("gray.700", "gray.300")}
                            _hover={{
                              color: useColorModeValue("black", "white"),
                              bg: useColorModeValue("#ebedf0", "#3661ed"),
                              marginLeft: 1
                            }}
                            href="/r/[category]"
                            as={`/r/${cat.name}`}
                          >
                            {cat.name}
                          </NextChakraLink>
                        </ListItem>
                      ))
                  : null}
              </List>
            </Skeleton>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}
