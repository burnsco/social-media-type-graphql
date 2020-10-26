import { useLogoutMutation, useMeQuery } from "@/generated/graphql"
import { sleep } from "@/utils/sleepy"
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Stack,
  Tooltip,
  useColorModeValue
} from "@chakra-ui/core"
import { useRouter } from "next/router"
import { AiOutlineLogout } from "react-icons/ai"
import { FaUserCircle } from "react-icons/fa"
import { ImPencil2 } from "react-icons/im"
import { MdSettings } from "react-icons/md"
import { ColorModeToggle } from "../Layout/ColorModeToggle"
import CreateCategoryDrawer from "./CategoryDrawer"
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
      <Flex justify="space-between" width="98%">
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

                <CreateCategoryDrawer />
                <ColorModeToggle />
              </ButtonGroup>
              <Menu>
                <MenuButton
                  as={Button}
                  width="140px"
                  border="1px"
                  colorScheme="blue.200"
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
                  <MenuGroup>
                    <MenuItem onClick={() => router.push("/profile")}>
                      <FaUserCircle />
                      <Box ml={1}>Profile</Box>
                    </MenuItem>
                    <MenuItem onClick={() => router.push("/account")}>
                      <MdSettings />
                      <Box ml={1}>Account</Box>
                    </MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup>
                    <MenuItem
                      mr={2}
                      onClick={() => {
                        logout().then(() => {
                          client.resetStore().then(async () => {
                            await sleep(1000)
                            router.push("/")
                          })
                        })
                      }}
                    >
                      <AiOutlineLogout />
                      <Box ml={1}>Logout</Box>
                    </MenuItem>
                  </MenuGroup>
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
    </Flex>
  )
}

export default Header
