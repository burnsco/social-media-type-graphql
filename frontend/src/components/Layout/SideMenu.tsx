import { List, ListItem, Skeleton } from '@chakra-ui/core'
import { NextChakraLink } from '@components/shared/NextChakraLink'
import { useCategoriesQuery } from '@generated/graphql'
import * as React from 'react'

const SideMenu: React.FC = () => {
  const { data, loading, error } = useCategoriesQuery()

  if (error) return <div>Error loading subreddits.</div>

  if (data?.categories) {
    return (
      <Skeleton isLoaded={!loading}>
        <List borderWidth='xs' minH='100%' spacing={3}>
          {data.categories.map((subreddit) => (
            <ListItem key={`subreddit-${subreddit.id}`}>
              <NextChakraLink href='/r/[category]' as={`/r/${subreddit.name}`}>
                {subreddit.name}
              </NextChakraLink>
            </ListItem>
          ))}
        </List>
      </Skeleton>
    )
  }
  return <div>No Subreddits</div>
}

export default SideMenu
