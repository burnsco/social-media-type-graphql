import { Box } from "@chakra-ui/core"

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
      minH="140px"
      width="100%"
      _hover={{
        boxShadow: "sm",
        borderWidth: "1px",
        borderColor: "#313131"
      }}
    >
      {children}
    </Box>
  )
}

export default PostContainer
