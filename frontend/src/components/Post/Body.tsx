import { Box, Flex, Heading, Link, Text } from "@chakra-ui/core"

const PostBody: React.FC<{
  title?: string | null
  text?: string | null
  link?: string | null
}> = ({ title, text, link }): JSX.Element => {
  return (
    <Flex direction="column" my={1} flexGrow={2} width="80%">
      <Heading fontWeight="500" fontSize="xl">
        {title}
      </Heading>

      {text && (
        <Text fontSize="sm" mt={1} noOfLines={4}>
          {text}
        </Text>
      )}

      {link && (
        <Box mt={1}>
          <Link href={`${link}`}>{link}</Link>
        </Box>
      )}
    </Flex>
  )
}

export default PostBody
