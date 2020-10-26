import { useCategoriesQuery } from "@/generated/graphql"
import { Box, List, ListItem, useColorModeValue } from "@chakra-ui/core"
import { useRouter } from "next/router"
import { memo, useEffect, useState } from "react"
import { NextChakraLink } from "../shared/NextChakraLink"

const SideMenu: React.FC = () => {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const color = useColorModeValue("gray.700", "gray.300")
  const hover = useColorModeValue("black", "white")
  const bg = useColorModeValue("white", "#1A1A1B")
  const linkbg = useColorModeValue("#ebedf0", "#3661ed")
  const linkbg2 = useColorModeValue("translucent", "translucent")

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const { category } = router.query
  const { data, loading, error } = useCategoriesQuery({ skip: !isMounted })

  if (error) return <div>Error loading subreddits.</div>
  if (loading) return <div>loading...</div>

  if (isMounted) {
    return (
      <Box
        bg={bg}
        minW="200px"
        borderWidth="1px"
        borderColor=""
        borderStyle="dotted"
        rounded="md"
        overflow="hidden"
        p={3}
      >
        <List borderWidth="xs" minH="100%" spacing={3}>
          {data?.categories.map(subreddit => (
            <ListItem key={`subreddit-${subreddit.id}`}>
              <Box
                rounded="md"
                overflow="hidden"
                bg={category === subreddit.name ? linkbg : linkbg2}
              >
                <NextChakraLink
                  p={1}
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
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    )
  }
  return null
}

export default memo(SideMenu)
