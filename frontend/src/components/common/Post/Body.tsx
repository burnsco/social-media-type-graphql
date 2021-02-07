import {
  AspectRatio,
  Box,
  Flex,
  Heading,
  Image,
  Link,
  Text
} from "@chakra-ui/react"

const PostBody: React.FC<{
  title?: string | null
  text?: string | null
  link?: string | null
  image?: string | null
  video?: string | null
}> = ({ title, text, link, image, video }): JSX.Element => {
  return (
    <Flex direction="column" my={1} flexGrow={2} width="100%">
      <Heading fontWeight="500" fontSize="xl">
        {title}
      </Heading>

      {image ? (
        <AspectRatio mt={2} maxW="400px" ratio={4 / 3}>
          <Image objectFit="cover" src={`${image}`} alt={`image-${title}`} />
        </AspectRatio>
      ) : null}

      {video ? (
        <AspectRatio maxW="560px" ratio={1}>
          <iframe title="test" src={video} allowFullScreen />
        </AspectRatio>
      ) : null}

      {text ? (
        <Text fontSize="sm" mt={1} noOfLines={4}>
          {text}
        </Text>
      ) : null}

      {link ? (
        <Box mt={1}>
          <Link href={`${link}`}>{link}</Link>
        </Box>
      ) : null}
    </Flex>
  )
}

export default PostBody
