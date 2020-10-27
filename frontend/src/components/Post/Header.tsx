import { timeDifferenceForDate } from "@/utils/timeDifferenceForDate"
import { Box, Flex, IconButton, Spacer, Tooltip } from "@chakra-ui/core"
import { useRouter } from "next/router"
import React from "react"
import { FiEdit } from "react-icons/fi"
import { DeletePostDialog } from "../shared/DeletePostDialog"
import PostCategory from "./Category"

const PostHeader: React.FC<{
  category?: string | null
  author?: string | null
  createdAt?: string | null
}> = ({ category, author, createdAt }) => {
  const router = useRouter()
  return (
    <Flex fontSize="xs" color="gray.400" w="full" h="10px">
      <Flex>
        <PostCategory category={category} />
        <Box ml="2" textDecoration="none">
          Posted by{" "}
          <Box
            onClick={() => router.push(`/user/${author}`)}
            fontWeight="500"
            display="inline"
            color="gray.500"
            _hover={{
              textDecoration: "underline",
              cursor: "pointer"
            }}
          >
            {author}
          </Box>
          <Box display="inline" ml="2">
            {timeDifferenceForDate(Number(createdAt))}
          </Box>
        </Box>
      </Flex>
      <Spacer />
      <Flex>
        <Tooltip
          placement="top"
          hasArrow
          label="Edit Post"
          bg="gray.200"
          color="black"
        >
          <IconButton
            onClick={() => router.push("/submit/edit")}
            mr={2}
            variant="outline"
            size="xs"
            aria-label="Edit Post"
            icon={<FiEdit />}
          />
        </Tooltip>
        <DeletePostDialog />
      </Flex>
    </Flex>
  )
}

export default PostHeader
