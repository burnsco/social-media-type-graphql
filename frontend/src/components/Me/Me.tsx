import Layout from "@/components/Layout"
import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/core"

const MePage = (): JSX.Element => {
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
