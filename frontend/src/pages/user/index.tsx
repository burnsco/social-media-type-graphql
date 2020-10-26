import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/core"

const UserPage = () => {
  const bg = useColorModeValue("white", "#1A1A1B")

  return (
    <Box bg={bg}>
      <Heading>User</Heading>

      <Text>About Me: </Text>
    </Box>
  )
}

export default UserPage
