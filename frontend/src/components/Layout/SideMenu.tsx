import { useCategoriesQuery } from "@/generated/graphql"
import {
  Box,
  List,
  ListItem,
  Skeleton,
  useColorModeValue
} from "@chakra-ui/core"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { NextChakraLink } from "../shared/NextChakraLink"

const SideMenu: React.FC = () => {
  const router = useRouter()

  const [isMounted, setIsMounted] = useState(false)

  const color = useColorModeValue("gray.700", "gray.300")
  const hover = useColorModeValue("gray.500", "white")
  const bg = useColorModeValue("white", "#1A1A1B")

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const { category } = router.query

  const { data, loading, error } = useCategoriesQuery({ skip: !isMounted })

  if (error) return <div>Error loading subreddits.</div>

  if (loading) return null

  return (
    <Skeleton isLoaded={!loading} startColor="pink.500" endColor="orange.500">
      <Box
        bg={bg}
        minW="180px"
        borderWidth="1px"
        borderStyle="dotted"
        rounded="md"
        overflow="hidden"
        p="4"
      >
        <List borderWidth="xs" minH="100%" spacing={3}>
          {data?.categories.map(subreddit => (
            <ListItem key={`subreddit-${subreddit.id}`}>
              <NextChakraLink
                fontWeight={category === subreddit.name ? 600 : 400}
                color={category === subreddit.name ? hover : color}
                _hover={{
                  color: hover,
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
    </Skeleton>
  )
}

export default SideMenu
