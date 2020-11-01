import { sleep } from "@/utils/sleepy"
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Stack
} from "@chakra-ui/core"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { AiOutlineLogout } from "react-icons/ai"
import { FaUserCircle } from "react-icons/fa"
import { MdSettings } from "react-icons/md"
import { useLogoutMutation, useMeQuery } from "../../generated/graphql"
import { ColorModeToggle } from "../Layout/ColorModeToggle"

const DynamicRegisterDrawer = dynamic(() => import("./RegisterDrawer"), {
  ssr: false
})
const DynamicLoginDrawer = dynamic(() => import("./LoginDrawer"), {
  ssr: false
})
const DynamicCreateCategoryDrawer = dynamic(() => import("./CategoryDrawer"), {
  ssr: false
})
const DynamicCreatePostDrawer = dynamic(() => import("./CreatePostDrawer"), {
  ssr: false
})

export default function HeaderMenu() {
  const router = useRouter()
  const { data, loading, client } = useMeQuery({ ssr: false })
  const [logout] = useLogoutMutation()

  if (data && data?.me?.username && !loading) {
    return (
      <Menu>
        <ButtonGroup spacing="4" mr="4">
          <DynamicCreatePostDrawer />

          <DynamicCreateCategoryDrawer />
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
          <ColorModeToggle />
          <MenuList opacity="0.9">
            <MenuGroup>
              <MenuItem onClick={() => router.push("/user/profile")}>
                <FaUserCircle />
                <Box ml={2}>Profile</Box>
              </MenuItem>
              <MenuItem onClick={() => router.push("/user/account")}>
                <MdSettings />
                <Box ml={2}>Account</Box>
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
    )
  }
  return (
    <Menu>
      <Stack spacing={4} direction="row" align="center">
        <DynamicRegisterDrawer />
        <DynamicLoginDrawer />
        <ColorModeToggle />
      </Stack>
    </Menu>
  )
}
