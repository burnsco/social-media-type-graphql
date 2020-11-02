import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/core"
import Layout from "../Layout"

const MePage = () => {
  const bg = useColorModeValue("white", "#1A1A1B")

  return (
    <Layout title="Me">
      <Box bg={bg}>
        <Heading>User</Heading>

        <Text>About Me: </Text>
      </Box>
    </Layout>
  )
}

export default MePage
