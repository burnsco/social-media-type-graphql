import { Box, List, ListItem, Skeleton } from "@chakra-ui/core"
import { NextChakraLink } from "@components/shared/NextChakraLink"
import { useCategoriesQuery } from "@generated/graphql"
import * as React from "react"

const SideMenu: React.FC = () => {
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  const { data, loading, error } = useCategoriesQuery({ skip: !isMounted })

  if (error) return <div>Error loading subreddits.</div>
  if (loading) return null
  return (
    <Skeleton isLoaded={!loading}>
      <Box borderWidth="1px" rounded="lg" overflow="hidden" p="4">
        <List borderWidth="xs" minH="100%" spacing={3}>
          {data?.categories.map(subreddit => (
            <ListItem key={`subreddit-${subreddit.id}`}>
              <NextChakraLink href="/r/[category]" as={`/r/${subreddit.name}`}>
                /r/{subreddit.name}
              </NextChakraLink>
            </ListItem>
          ))}
        </List>
      </Box>
    </Skeleton>
  )
}

export default SideMenu
