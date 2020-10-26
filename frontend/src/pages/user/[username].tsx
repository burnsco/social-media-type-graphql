import { useUserQuery } from "@/generated/graphql"
import { Box, Heading, Text } from "@chakra-ui/core"
import { useRouter } from "next/router"

const UsernamePage = () => {
  const router = useRouter()
  const username = router.query.username
  const { data, loading } = useUserQuery({
    variables: { data: { username: username as string } }
  })

  if (loading) return null

  if (data && data.user) {
    return (
      <Box>
        <Heading>User</Heading>

        <Text>{data.user.username} </Text>
        <Text>{data.user.email} </Text>
        <Text>{data.user.about} </Text>
      </Box>
    )
  }
  return null
}

export default UsernamePage
