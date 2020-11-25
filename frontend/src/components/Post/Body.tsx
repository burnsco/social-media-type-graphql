import { Box, Flex, Heading, Image, Link, Text } from "@chakra-ui/core"

const PostBody: React.FC<{
  title?: string | null
  text?: string | null
  link?: string | null
  image?: string | null
}> = ({ title, text, link, image }): JSX.Element => {
  return (
    <Flex direction="column" my={1} flexGrow={2} width="100%">
      <Heading fontWeight="500" fontSize="xl">
        {title}
      </Heading>

      {image && (
        <Image
          ignoreFallback={true}
          boxSize="100%"
          src={`${image}`}
          alt={`image-${title}`}
          objectFit="cover"
        />
      )}

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
