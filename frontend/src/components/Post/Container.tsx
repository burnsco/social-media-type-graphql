import { Box } from "@chakra-ui/core"

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
        borderWidth: "1px",
        borderColor: "gray.400"
      }}
    >
      {children}
    </Box>
  )
}

export default PostContainer
