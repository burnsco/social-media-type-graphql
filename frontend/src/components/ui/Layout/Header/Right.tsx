import { useLogoutMutation, useMeQuery } from "@/generated/graphql"
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
  Skeleton,
  SkeletonCircle,
  Stack,
  useColorModeValue,
  VisuallyHidden
} from "@chakra-ui/react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { AiOutlineLogout } from "react-icons/ai"
import { FaUserCircle } from "react-icons/fa"
import { MdSettings } from "react-icons/md"

const DynamicRegisterDrawer = dynamic(
  () => import("@/components/common/Drawers/RegisterDrawer"),
  { loading: () => <SkeletonCircle size="10" /> }
)
const DynamicLoginDrawer = dynamic(
  () => import("@/components/common/Drawers/LoginDrawer"),
  { loading: () => <SkeletonCircle size="10" /> }
)
const DynamicCreateCategoryDrawer = dynamic(
  () => import("@/components/common/Drawers/CategoryDrawer"),
  { loading: () => <SkeletonCircle size="10" /> }
)
const DynamicCreatePostDrawer = dynamic(
  () => import("@/components/common/Drawers/CreatePostDrawer"),
  { loading: () => <SkeletonCircle size="10" /> }
)

const HeaderMenu = () => {
  const bg = useColorModeValue("white", "#202020")

  const router = useRouter()

  const { data, loading, client } = useMeQuery({ ssr: true })

  const [logout] = useLogoutMutation()

  if (loading) return <VisuallyHidden>Loading Header</VisuallyHidden>

  if (data && data?.me?.username && !loading) {
    return (
      <Menu>
        <ButtonGroup spacing="4" mr="4">
          <DynamicCreatePostDrawer />

          <DynamicCreateCategoryDrawer />
        </ButtonGroup>

        <Skeleton isLoaded={!loading}>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={
                <Avatar
                  loading="eager"
                  size="xs"
                  name="Ryan Florence"
                  src={"https://bit.ly/ryan-florence" || data?.me.avatar}
                />
              }
            ></MenuButton>

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
        </Skeleton>
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
