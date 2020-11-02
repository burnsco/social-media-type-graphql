import { Box, Flex, HStack, useColorModeValue } from "@chakra-ui/core"
import React from "react"
import { RiMessage2Fill } from "react-icons/ri"
import { NextChakraLink } from "../shared/NextChakraLink"

const PostFooter: React.FC<{
  category?: string | null
  id?: string | null
  commentsCount?: number
}> = ({ category, id, commentsCount }) => {
  const linkbg = useColorModeValue("#ebedf0", "gray.600")
  const linkcolor = useColorModeValue("black", "white")
  return (
    <Flex width="100%" fontSize="12px" p={1}>
      <Box
        p={1}
        borderRadius={2}
        _hover={{
          transition: "0.3s all",
          bg: linkbg,
          color: linkcolor
        }}
      >
        <HStack>
          <RiMessage2Fill />
          <NextChakraLink
            _hover={{ textTransform: "none" }}
            href="/r/[category]/[id]"
            as={`/r/${category}/${id}`}
          >
            {commentsCount} Comments
          </NextChakraLink>
        </HStack>
      </Box>
    </Flex>
  )
}

export default PostFooter
