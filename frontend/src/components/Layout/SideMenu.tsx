import {
  Box,
  List,
  ListItem,
  Skeleton,
  useColorModeValue
} from "@chakra-ui/core"
import * as React from "react"
import { useCategoriesQuery } from "../../generated/graphql"
import { NextChakraLink } from "../shared/NextChakraLink"

const SideMenu: React.FC = () => {
  const [isMounted, setIsMounted] = React.useState(false)
  const color = useColorModeValue("gray.700", "gray.300")
  const hover = useColorModeValue("gray.500", "white")
  const bg = useColorModeValue("white", "#1A1A1B")
  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  const { data, loading, error } = useCategoriesQuery({ skip: !isMounted })

  if (error) return <div>Error loading subreddits.</div>
  if (loading) return null

  return (
    <Skeleton isLoaded={!loading}>
      <Box bg={bg} borderWidth="1px" rounded="md" overflow="hidden" p="4">
        <List borderWidth="xs" minH="100%" spacing={3}>
          {data?.categories.map(subreddit => (
            <ListItem key={`subreddit-${subreddit.id}`}>
              <NextChakraLink
                fontWeight="500"
                color={color}
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
