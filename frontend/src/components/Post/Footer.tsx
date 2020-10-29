import { Flex, HStack } from "@chakra-ui/core"
import React from "react"
import { RiMessage2Fill } from "react-icons/ri"
import { NextChakraLink } from "../shared/NextChakraLink"

const PostFooter: React.FC<{
  category?: string | null
  id?: string | null
  commentsCount?: number
}> = ({ category, id, commentsCount }) => {
  return (
    <Flex width="100%" fontSize="12px" p={1} color="gray.400">
      <HStack>
        <RiMessage2Fill />
        <NextChakraLink href="/r/[category]/[id]" as={`/r/${category}/${id}`}>
          {commentsCount} Comments
        </NextChakraLink>
      </HStack>
    </Flex>
  )
}

export default PostFooter
