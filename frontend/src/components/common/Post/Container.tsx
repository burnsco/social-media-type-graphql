import { Box, useColorModeValue } from "@chakra-ui/react"

const PostContainer: React.FC<{ children: React.ReactNode; bg: string }> = ({
  children,
  bg
}): JSX.Element => {
  return (
    <Box
      boxShadow="sm"
      bg={bg}
      borderWidth="1px"
      overflow="hidden"
      display="flex"
      borderColor={useColorModeValue("gray.100", "#313131")}
      minH="160px"
      width="100%"
      maxH="800px"
      _hover={{
        boxShadow: "md",
        borderWidth: "1px",
        borderColor: useColorModeValue("gray.200", "gray.600")
      }}
    >
      {children}
    </Box>
  )
}

export default PostContainer
