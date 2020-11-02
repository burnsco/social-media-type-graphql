import { Box, useColorModeValue } from "@chakra-ui/core"

const PostContainer: React.FC<{ children: React.ReactNode; bg: string }> = ({
  children,
  bg
}) => {
  return (
    <Box
      boxShadow="sm"
      bg={bg}
      borderWidth="1px"
      overflow="hidden"
      display="flex"
      borderColor={useColorModeValue("gray.100", "gray.400")}
      minH="160px"
      width="100%"
      _hover={{
        boxShadow: "lg",
        borderWidth: "1px",
        borderColor: useColorModeValue("gray.200", "gray.50")
      }}
    >
      {children}
    </Box>
  )
}

export default PostContainer
