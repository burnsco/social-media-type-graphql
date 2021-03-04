import { CommentQuery } from "@/generated/graphql"
import { timeDifferenceForDate } from "@/utils/index"
import {
  Box,
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorModeValue
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import React from "react"
import { BsArrowDown, BsArrowUp } from "react-icons/bs"
import { FaUserCircle } from "react-icons/fa"
import { IoAddCircle } from "react-icons/io5"
import { MdEmail, MdMessage } from "react-icons/md"

const CommentPage: React.FC<CommentQuery> = ({ comment }) => {
  const bg = useColorModeValue("white", "#202020")
  const router = useRouter()
  const votebg = useColorModeValue("gray.50", "#313131")

  return (
    <Flex bg={bg} minH="80px" width="100%">
      <Box bg={votebg}>
        <Flex
          width="45px"
          flexDir="column"
          alignItems="center"
          p="2"
          height="100%"
        >
          <IconButton
            onClick={() => console.log("upvote")}
            variant="ghost"
            color="current"
            aria-label="UpVote"
            icon={<BsArrowUp />}
          />

          <IconButton
            onClick={() => console.log("downvote")}
            variant="ghost"
            color="current"
            aria-label="DownVote"
            icon={<BsArrowDown />}
          />
        </Flex>
      </Box>

      {/* Comment Details Container */}
      <Box
        p={2}
        ml="1"
        minH="80px"
        width="100%"
        display="flex"
        flexDir="column"
      >
        <Stack fontSize="xs" color={useColorModeValue("gray.600", "gray.400")}>
          <Box textDecoration="none" mb={2}>
            Comment by
            <Menu>
              <Button ml={2} size="xs" variant="outline" as={MenuButton}>
                {comment?.createdBy?.username}
              </Button>

              <MenuList opacity="0.7" bg={bg}>
                <MenuGroup color="lightsteelblue">
                  <MenuItem
                    onClick={() =>
                      router.push(`/user/${comment?.createdBy.username}`)
                    }
                  >
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
            <Box
              display="inline"
              color={useColorModeValue("darkblue", "lightblue")}
              ml="1"
              _hover={{
                textDecoration: "underline",
                cursor: "pointer"
              }}
            ></Box>
            <Box display="inline" ml="2">
              {timeDifferenceForDate(Number(comment?.createdAt))}
            </Box>
          </Box>
        </Stack>

        <Text>{comment?.body}</Text>
      </Box>
    </Flex>
  )
}

export default CommentPage
