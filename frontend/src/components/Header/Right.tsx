import { useLogoutMutation, useMeQuery } from "@/generated/graphql"
import { sleep } from "@/utils/sleepy"
import {
  Avatar,
  Box,
  ButtonGroup,
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
} from "@chakra-ui/core"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { AiOutlineLogout } from "react-icons/ai"
import { FaUserCircle } from "react-icons/fa"
import { MdSettings } from "react-icons/md"

const DynamicRegisterDrawer = dynamic(
  () => import("../Drawers/RegisterDrawer"),
  { ssr: false }
)

const DynamicLoginDrawer = dynamic(() => import("../Drawers/LoginDrawer"), {
  ssr: false
})

const DynamicCreateCategoryDrawer = dynamic(
  () => import("../Drawers/CategoryDrawer"),
  { ssr: false }
)
const DynamicCreatePostDrawer = dynamic(
  () => import("../Drawers/CreatePostDrawer"),
  { ssr: false }
)

const HeaderMenu = () => {
  const router = useRouter()
  const bg = useColorModeValue("white", "#202020")
  const { data, loading, client } = useMeQuery({ ssr: false })
  const [logout] = useLogoutMutation()

  if (loading) return <VisuallyHidden>Loading Header</VisuallyHidden>

  if (data && data?.me?.username && !loading) {
    return (
      <Menu>
        <ButtonGroup spacing="4" mr="4">
          <DynamicCreatePostDrawer />

          <DynamicCreateCategoryDrawer />
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
                src={"https://bit.ly/ryan-florence" || data?.me.avatar}
              />
            }
            size="md"
          />

          <MenuList opacity="0.7" bg={bg}>
            <MenuGroup title={data.me.username} color="blue">
              <MenuDivider />
              <MenuItem onClick={() => router.push("/user/profile")}>
                <FaUserCircle />
                <Box ml={3}>Profile</Box>
              </MenuItem>
              <MenuItem onClick={() => router.push("/user/account")}>
                <MdSettings />
                <Box ml={3}>Account</Box>
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
                <Box ml={3}>Logout</Box>
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Menu>
    )
  }
  return (
    <Menu>
      <Stack spacing={4} direction="row" align="center">
        <DynamicRegisterDrawer />
        <DynamicLoginDrawer />
      </Stack>
    </Menu>
  )
}

export default HeaderMenu
