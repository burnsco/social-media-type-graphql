import { List, ListItem, Skeleton } from "@chakra-ui/core"
import { NextChakraLink } from "@components/shared/NextChakraLink"
import { useAllCategoriesQuery } from "@generated/graphql"
import * as React from "react"

const SideMenu: React.FC = () => {
  const { data, loading, error } = useAllCategoriesQuery()

  if (error) return <div>Error loading subreddits.</div>

  return (
    <Skeleton isLoaded={!loading}>
      <List borderWidth="1px" minH="100%" spacing={3}>
        {data?.categories?.map((subreddit) =>
          !subreddit ? null : (
            <ListItem key={`subreddit-${subreddit.id}`}>
              <NextChakraLink
                href="/r/[category]"
                as={`/r/${subreddit.name.toLowerCase()}`}
              >
                {subreddit.name}
              </NextChakraLink>
            </ListItem>
          ),
        )}
      </List>
    </Skeleton>
  )
}

export default SideMenu
