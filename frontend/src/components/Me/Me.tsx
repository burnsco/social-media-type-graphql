import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/core"

const MePage = () => {
  const bg = useColorModeValue("white", "#1A1A1B")

  return (
    <Box bg={bg}>
      <Heading>User</Heading>

      <Text>About Me: </Text>
    </Box>
  )
}

export default MePage
