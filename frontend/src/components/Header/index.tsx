import { useLogoutMutation, useMeQuery } from "@/generated/graphql"
import {
  Avatar,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Stack,
  Tooltip,
  useColorModeValue
} from "@chakra-ui/core"
import { useRouter } from "next/router"
import { BsFolderPlus } from "react-icons/bs"
import { ImPencil2 } from "react-icons/im"
import { ColorModeToggle } from "../Layout/ColorModeToggle"
import HomeSearch from "./Center"
import LoginDrawer from "./LoginDrawer"
import Logo from "./Logo"
import RegisterDrawer from "./RegisterDrawer"

const Header: React.FC = () => {
  const bg = useColorModeValue("white", "#1A1A1B")
  const router = useRouter()
  const { data, loading, client } = useMeQuery({ ssr: false })
  const [logout] = useLogoutMutation()

  if (loading) return null

  return (
    <Flex
      position="fixed"
      as="header"
      bg={bg}
      zIndex="sticky"
      boxShadow="sm"
      width="full"
      p={[1]}
      align="center"
    >
      <Flex justify="space-between" width="full">
        <Flex cursor="pointer" flexGrow={1} onClick={() => router.push("/")}>
          <Flex
            onClick={() => router.push("/")}
            aria-label="Home"
            align="center"
            mx="1em"
            p={1}
          >
            <Logo mr={2} />{" "}
            <Heading
              mr={4}
              display={{ base: "none", md: "flex" }}
              size="md"
              fontWeight="600"
            >
              reddit
            </Heading>
          </Flex>
        </Flex>

        <HomeSearch />

        <Flex flexGrow={1} maxW="720px" as="nav" justify="flex-end">
          {data && data?.me?.username ? (
            <Menu>
              <ButtonGroup spacing="4" mr="4">
                <Tooltip
                  hasArrow
                  label="Create Post"
                  bg="gray.200"
                  color="black"
                >
                  <IconButton
                    onClick={() => router.push("/submit")}
                    colorScheme="green"
                    size="md"
                    aria-label="Create Post"
                    icon={<ImPencil2 />}
                  />
                </Tooltip>

                <Tooltip
                  hasArrow
                  label="Create Subreddit"
                  bg="gray.200"
                  color="black"
                >
                  <IconButton
                    onClick={() => router.push("/submit/Subreddit")}
                    colorScheme="orange"
                    size="md"
                    aria-label="Create Subreddit"
                    icon={<BsFolderPlus />}
                  />
                </Tooltip>
              </ButtonGroup>
              <Menu>
                <MenuButton
                  as={Button}
                  width="140px"
                  border="1px"
                  colorScheme="blue"
                  rightIcon={
                    <Avatar
                      size="xs"
                      name="Ryan Florence"
                      src="https://bit.ly/ryan-florence"
                    />
                  }
                  variant="outline"
                >
                  {data.me.username}
                </MenuButton>
                <MenuList opacity="0.9">
                  <MenuGroup title="Settings">
                    <MenuItem onClick={() => router.push("/profile")}>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={() => router.push("/account")}>
                      Account
                    </MenuItem>
                    <MenuItem onClick={() => router.push("/general")}>
                      General
                    </MenuItem>
                  </MenuGroup>
                  <MenuItem
                    mr={2}
                    color="red.500"
                    onClick={() => {
                      logout().then(() => {
                        client.resetStore().then(() => {
                          router.push("/register")
                        })
                      })
                    }}
                  >
                    {" "}
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Menu>
          ) : (
            <Menu>
              <Stack spacing={4} direction="row" align="center">
                <RegisterDrawer />
                <LoginDrawer />
              </Stack>
            </Menu>
          )}
        </Flex>
      </Flex>
      <ColorModeToggle />
    </Flex>
  )
}

export default Header
