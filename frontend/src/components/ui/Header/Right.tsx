import { useLogoutMutation, useMeQuery } from "@/generated/graphql"
import {
  Avatar,
  Box,
  ButtonGroup,
  chakra,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Stack,
  useColorModeValue,
  VisuallyHidden
} from "@chakra-ui/react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { AiOutlineLogout } from "react-icons/ai"
import { FaUserCircle } from "react-icons/fa"
import { MdSettings } from "react-icons/md"

const DynamicChatRoomDrawer = dynamic(
  () => import("@/components/common/Drawers/Chat"),
  { ssr: false }
)

const DynamicRegisterDrawer = dynamic(
  () => import("@/components/common/Drawers/Register"),
  { ssr: false }
)

const DynamicLoginDrawer = dynamic(
  () => import("@/components/common/Drawers/Login"),
  {
    ssr: false
  }
)

const DynamicCreateCategoryDrawer = dynamic(
  () => import("@/components/common/Drawers/CreateSubreddit"),
  { ssr: false }
)
const DynamicCreatePostDrawer = dynamic(
  () => import("@/components/common/Drawers/CreatePost"),
  { ssr: false }
)

const DynamicAddFriendDrawer = dynamic(
  () => import("@/components/common/Drawers/AddFriend"),
  { ssr: false }
)

export default function HeaderMenu() {
  const router = useRouter()
  const bg = useColorModeValue("white", "#202020")
  const { data, loading } = useMeQuery({ ssr: false })
  const [logout, { client }] = useLogoutMutation()

  if (loading) return <VisuallyHidden>Loading Header</VisuallyHidden>

  if (data && data?.me?.username && !loading) {
    return (
      <HStack spacing={2}>
        <ButtonGroup>
          <DynamicChatRoomDrawer />
          <DynamicCreatePostDrawer />
          <DynamicCreateCategoryDrawer />
          <DynamicAddFriendDrawer />
        </ButtonGroup>

        <Menu>
          <IconButton
            as={MenuButton}
            variant="ghost"
            aria-label="Create a Subreddit"
            icon={
              <Avatar
                size="xs"
                name="Ryan Florence"
                src={data?.me.avatar || "https://bit.ly/ryan-florence"}
              />
            }
            size="md"
          />

          <MenuList opacity="0.7" bg={bg}>
            <MenuGroup title={data.me.username} color="lightsteelblue">
              <MenuDivider />
              <MenuItem onClick={() => router.push("/user")}>
                <FaUserCircle />
                <chakra.span>Profile</chakra.span>
              </MenuItem>
              <MenuItem onClick={() => router.push("/user/account")}>
                <MdSettings />
                <chakra.span>Profile</chakra.span>
              </MenuItem>
              <MenuItem onClick={() => router.push("/user/account")}>
                <MdSettings />
                <chakra.span>Profile</chakra.span>
              </MenuItem>
              <MenuItem onClick={() => router.push("/user/account")}>
                <MdSettings />
                <chakra.span>Profile</chakra.span>
              </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup>
              <MenuItem
                onClick={() => {
                  logout().then(() => {
                    client.resetStore().then(() => {
                      router.push("/")
                    })
                  })
                }}
              >
                <AiOutlineLogout />
                <Box>Logout</Box>
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </HStack>
    )
  }
  return (
    <Stack spacing={4} direction="row" align="center">
      <DynamicRegisterDrawer />
      <DynamicLoginDrawer />
    </Stack>
  )
}
