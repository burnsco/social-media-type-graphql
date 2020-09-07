import { List, ListItem, Skeleton } from "@chakra-ui/core"
import { useAllCategoriesQuery } from "../../generated/graphql"
import { NextChakraLink } from "../shared/NextChakraLink"

const SideMenu: React.FC = () => {
  const { data, loading, error } = useAllCategoriesQuery()

  if (error) return <div>Error loading subreddits.</div>

  return (
    <Skeleton isLoaded={!loading}>
      <List borderWidth="1px" minH="100%" spacing={3}>
        {data?.categories?.map(subreddit => {
          return (
            <ListItem key={`subreddit-${subreddit.id}`}>
              <NextChakraLink href="/r/[category]" as={`/r/${subreddit.name}`}>
                {subreddit.name}
              </NextChakraLink>
            </ListItem>
          )
        })}
      </List>
    </Skeleton>
  )
}

export default SideMenu
