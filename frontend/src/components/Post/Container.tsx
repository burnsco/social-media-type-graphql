import { Box } from "@chakra-ui/core"
import { memo } from "react"

const PostContainer: React.FC<{ children: React.ReactNode; bg: string }> = ({
  children,
  bg
}) => {
  return (
    <Box
      bg={bg}
      borderWidth="1px"
      rounded="md"
      overflow="hidden"
      display="flex"
      mb="20px"
      minH="100px"
      width="100%"
      _hover={{
        borderColor: "gray.500"
      }}
    >
      {children}
    </Box>
  )
}

export default memo(PostContainer)
