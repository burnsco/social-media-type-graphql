import { NextChakraLink } from "@/components/common/index"
import { useCategoriesLazyQuery } from "@/generated/graphql"
import {
  Alert,
  Box,
  List,
  ListItem,
  Text,
  useColorModeValue,
  VisuallyHidden
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect } from "react"

const SideMenu: React.FC = () => {
  const router = useRouter()

  const color = useColorModeValue("gray.700", "gray.300")
  const hover = useColorModeValue("black", "white")
  const bg = useColorModeValue("white", "#202020")
  const linkbg = useColorModeValue("#ebedf0", "#3661ed")
  const linkbg2 = useColorModeValue("translucent", "translucent")

  const { category } = router.query

  const [fetchCategories, { data, loading, error }] = useCategoriesLazyQuery()

  useEffect(() => fetchCategories, [fetchCategories])

  if (loading) return <VisuallyHidden>loading</VisuallyHidden>

  if (error) return <Alert>{error}</Alert>

  return (
    <>
      {data && data.categories && data.categories.length > 0 ? (
        <Box
          bg={bg}
          minW="200px"
          borderWidth="1px"
          overflow="hidden"
          boxShadow="xs"
        >
          <Box h="100%" w="100%">
            <List minH="100%" spacing={3} fontSize="md" p={2}>
              {data?.categories?.map((subreddit, i) => (
                <ListItem key={`subreddit-${subreddit.id}-${i}`}>
                  <NextChakraLink
                    p={1}
                    bg={category === subreddit.name ? linkbg : linkbg2}
                    fontWeight={category === subreddit.name ? "500" : "400"}
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
      ) : (
        <Text>No Categories Created.</Text>
      )}
    </>
  )
}

export default SideMenu
