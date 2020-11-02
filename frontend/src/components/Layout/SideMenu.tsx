import { useCategoriesQuery } from "@/generated/graphql"
import { Box, List, ListItem, useColorModeValue } from "@chakra-ui/core"
import { useRouter } from "next/router"
import { memo } from "react"
import { NextChakraLink } from "../shared/NextChakraLink"

const SideMenu: React.FC = () => {
  const router = useRouter()

  const color = useColorModeValue("gray.700", "gray.300")
  const hover = useColorModeValue("black", "white")
  const bg = useColorModeValue("white", "#202020")
  const linkbg = useColorModeValue("#ebedf0", "#3661ed")
  const linkbg2 = useColorModeValue("translucent", "translucent")
  const headerbg = useColorModeValue("gray.50", "#313131")

  const { category } = router.query

  const { data, loading, error } = useCategoriesQuery()

  if (!loading && !error) {
    return (
      <Box
        bg={bg}
        minW="200px"
        borderWidth="1px"
        overflow="hidden"
        boxShadow="xs"
      >
        <Box p={4}>
          <List minH="100%" spacing={3}>
            {data?.categories.map(subreddit => (
              <ListItem key={`subreddit-${subreddit.id}`}>
                <NextChakraLink
                  p={1}
                  bg={category === subreddit.name ? linkbg : linkbg2}
                  fontWeight={category === subreddit.name ? 500 : 400}
                  color={category === subreddit.name ? hover : color}
                  _hover={{
                    color: hover,
                    bg: linkbg,
                    marginLeft: 1
                  }}
                  href="/r/[category]"
                  as={`/r/${subreddit.name}`}
                >
                  {subreddit.name}
                </NextChakraLink>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    )
  }
  return null
}

export default memo(SideMenu)
