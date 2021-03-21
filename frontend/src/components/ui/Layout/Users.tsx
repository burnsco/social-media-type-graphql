import { useUsersQueryQuery } from "@/generated/graphql"
import {
  Alert,
  Box,
  List,
  ListItem,
  useColorModeValue,
  VisuallyHidden
} from "@chakra-ui/react"

const UsersSideMenu: React.FC = () => {
  const bg = useColorModeValue("white", "#202020")

  const { data, loading, error } = useUsersQueryQuery()

  if (loading) return <VisuallyHidden>loading</VisuallyHidden>

  if (error) return <Alert>{error}</Alert>

  return (
    <Box
      bg={bg}
      minW="200px"
      borderWidth="1px"
      overflow="hidden"
      boxShadow="xs"
    >
      <Box h="100%" w="100%">
        {data && data.users
          ? data.users.map(user => (
              <List
                minH="100%"
                spacing={3}
                fontSize="md"
                p={2}
                key={`user-${user.id}`}
              >
                <ListItem>{user.createdAt}</ListItem>
                <ListItem>{user.email}</ListItem>
                <ListItem>{user.online}</ListItem>
                <ListItem>{user.updatedAt}</ListItem>
              </List>
            ))
          : null}
      </Box>
    </Box>
  )
}

export default UsersSideMenu
