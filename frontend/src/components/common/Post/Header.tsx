import { DeletePostDialog } from "@/components/common/DeletePostDialog"
import { User } from "@/generated/graphql"
import { timeDifferenceForDate } from "@/utils/index"
import {
  Box,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Spacer,
  useColorModeValue
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import React from "react"
import { FaUserCircle } from "react-icons/fa"
import { IoAddCircle } from "react-icons/io5"
import { MdEmail, MdMessage } from "react-icons/md"
import { OfflineCircle, OnlineCircle } from "../OnlineOffline"

const PostHeader: React.FC<{
  category?: string | null
  author?: Partial<User>
  createdAt?: string | null
  updatedAt?: string | null
  postId?: string | null | undefined
}> = ({ category, author, createdAt, postId, updatedAt }) => {
  const fontColor = useColorModeValue("#1A1A1B", "gray.200")
  const bg = useColorModeValue("white", "#202020")
  const router = useRouter()

  const renderPostCreatedOrEdited = () => (
    <Box ml="3" textDecoration="none">
      Posted by
      <Menu>
        <Button ml={2} size="xs" variant="outline" as={MenuButton}>
          {author?.username}
          {author?.online ? <OnlineCircle /> : <OfflineCircle />}
        </Button>

        <MenuList opacity="0.7" bg={bg}>
          <MenuGroup color="lightsteelblue">
            <MenuItem onClick={() => router.push(`/user/${author?.username}`)}>
              <FaUserCircle />
              <Box ml={3}>Profile</Box>
            </MenuItem>
            <MenuDivider />
          </MenuGroup>
          <MenuItem onClick={() => router.push("/user/account")}>
            <IoAddCircle />
            <Box ml={3}>Add to Friends</Box>
          </MenuItem>
          <MenuItem onClick={() => router.push("/user/account")}>
            <MdEmail />
            <Box ml={3}>Message</Box>
          </MenuItem>
          <MenuItem onClick={() => router.push("/user/account")}>
            <MdMessage />
            <Box ml={3}>Chat</Box>
          </MenuItem>
        </MenuList>
      </Menu>
      <Box display="inline" ml="2">
        {timeDifferenceForDate(createdAt)}
      </Box>
    </Box>
  )

  const renderPostCategoryLink = () => (
    <Box
      fontWeight="600"
      color="orange.500"
      _hover={{
        textDecoration: "underline"
      }}
    >
      <Box
        _hover={{
          textDecoration: "underline",
          cursor: "pointer"
        }}
        onClick={() => router.push(`/r/${category}`)}
      >
        /r/{category}
      </Box>
    </Box>
  )

  return (
    <HStack fontSize="sm" my={1} color={fontColor} w="full">
      <HStack>
        {renderPostCategoryLink()}
        {renderPostCreatedOrEdited()}
      </HStack>
      <Spacer />

      <Flex mr={1}>
        <DeletePostDialog postId={postId} />
      </Flex>
    </HStack>
  )
}

export default PostHeader
