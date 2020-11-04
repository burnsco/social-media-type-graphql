import { NextChakraLink } from "@/components/shared/NextChakraLink"
import { useCategoriesQuery } from "@/generated/graphql"
import {
  Box,
  List,
  ListItem,
  Text,
  useColorModeValue,
  useToken
} from "@chakra-ui/core"
import { useRouter } from "next/router"
import { memo } from "react"

const SideMenu: React.FC = () => {
  const router = useRouter()
  const [red100, blue200] = useToken(
    // the key within the theme, in this case `theme.colors`
    "colors",
    // the subkey(s), resolving to `theme.colors.red.100`
    ["red.400", "orange.500"]
    // a single fallback or fallback array matching the length of the previous arg
  )
  const color = useColorModeValue("gray.700", "gray.300")
  const hover = useColorModeValue("black", "white")
  const bg = useColorModeValue("white", "#202020")
  const linkbg = useColorModeValue("#ebedf0", "#3661ed")
  const linkbg2 = useColorModeValue("translucent", "translucent")

  const { category } = router.query

  const { data, loading, client } = useCategoriesQuery()

  if (loading) return null

  return (
    <Box
      bg={bg}
      minW="200px"
      borderWidth="1px"
      overflow="hidden"
      boxShadow="xs"
    >
      <Box h="100%" w="100%">
        <Text
          textAlign="center"
          p={2}
          bg={`linear-gradient(${red100}, ${blue200})`}
        >
          Categories
        </Text>
        <List minH="100%" spacing={3} fontSize="md" p={2}>
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

export default memo(SideMenu)
