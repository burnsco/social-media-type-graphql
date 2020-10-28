import { Box, Flex, Heading, Link, Text } from "@chakra-ui/core"

const PostBody: React.FC<{
  title?: string | null
  text?: string | null
  link?: string | null
}> = ({ title, text, link }) => {
  return (
    <Flex direction="column" flexGrow={2} width="60%">
      <Heading fontWeight="500" fontSize="xl">
        {title}
      </Heading>

      <Text fontSize="sm" mt={1}>
        {text}
      </Text>

      <Box mt={1}>
        <Link href={`https://${link}`}>{link}</Link>
      </Box>
    </Flex>
  )
}

export default PostBody
