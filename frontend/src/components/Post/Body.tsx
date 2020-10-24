import { Box, Heading, Link, Text } from "@chakra-ui/core"

const PostBody: React.FC<{
  title?: string | null
  text?: string | null
  link?: string | null
}> = ({ title, text, link }) => {
  return (
    <>
      <Box mt={1} fontWeight="500">
        <Heading fontSize="xl">{title}</Heading>
      </Box>

      <Text fontSize="sm" mt={1}>
        {text}
      </Text>

      <Box mt={1}>
        <Link href={`https://${link}`}>{link}</Link>
      </Box>
    </>
  )
}

export default PostBody
