import { Link, List, ListIcon, ListItem, Skeleton } from '@chakra-ui/core'
import NextLink from 'next/link'
import React from 'react'
import { useAllCategoriesQuery } from '../../generated/graphql'

const SideMenu: React.FC = () => {
  const { data, loading, error } = useAllCategoriesQuery()

  if (error) return <div>Error loading subreddits.</div>

  return (
    <Skeleton isLoaded={!loading}>
      <List borderWidth="1px" minH="100%" spacing={3}>
        {data?.categories?.map(subreddit => {
          return (
            <ListItem key={`subreddit-${subreddit.id}`}>
              <NextLink href={`/r/${subreddit.name}`}>
                <Link>{subreddit.name}</Link>
              </NextLink>
            </ListItem>
          )
        })}
      </List>
    </Skeleton>
  )
}

export default SideMenu
