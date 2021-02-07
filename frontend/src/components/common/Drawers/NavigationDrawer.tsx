import { NextChakraLink } from "@/components/common/index"
import { useCategoriesLazyQuery } from "@/generated/graphql"
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Input,
  List,
  ListItem,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"

function NavigationDrawer() {
  const [input, setInput] = useState("")

  const color = useColorModeValue("gray.700", "gray.300")
  const hover = useColorModeValue("black", "white")

  const linkbg = useColorModeValue("#ebedf0", "#3661ed")
  const linkbg2 = useColorModeValue("translucent", "translucent")

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [getCategories, { loading, data }] = useCategoriesLazyQuery()

  useEffect(() => {
    getCategories()
  }, [getCategories])

  const btnRef = useRef<HTMLButtonElement | null>(null)

  if (loading) return null

  if (data && data.categories) {
    return (
      <>
        <Button variant="outline" size="md" ref={btnRef} onClick={onOpen}>
          Navigation
        </Button>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <Input
                placeholder="Search subreddits"
                value={input}
                onChange={e => setInput(e.target.value)}
              />
            </DrawerHeader>
            <DrawerBody>
              <List>
                {data.categories
                  .filter(c =>
                    c.name.toLowerCase().includes(input.toLowerCase())
                  )
                  .map(cat => (
                    <ListItem p={1} key={`sideNav-${cat.name}-${cat.id}`}>
                      <NextChakraLink
                        p={1}
                        bg={linkbg2}
                        fontWeight="400"
                        color={color}
                        _hover={{
                          color: hover,
                          bg: linkbg,
                          marginLeft: 1
                        }}
                        href="/r/[category]"
                        as={`/r/${cat.name}`}
                      >
                        {cat.name}
                      </NextChakraLink>
                    </ListItem>
                  ))}
              </List>
            </DrawerBody>
            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }
  return <Heading>Error Loading Subreddits</Heading>
}

export default NavigationDrawer
