import { Box, Heading, Link, Text } from "@chakra-ui/core"
import { memo } from "react"

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

      <Text mt={1}>{text}</Text>

      <Box mt={1}>
        <Link href={`https://${link}`}>{link}</Link>
      </Box>
    </>
  )
}

export default memo(PostBody)
