import Layout from "@/components/ui/Layout"
import { useUserQuery } from "@/generated/graphql"
import { Box, Heading, Text, VisuallyHidden } from "@chakra-ui/react"
import { useRouter } from "next/router"

const AboutUserPage = () => {
  const router = useRouter()
  const username = router.query.username
  const { data, loading } = useUserQuery({
    variables: { data: { username: username as string } }
  })

  if (loading) return <VisuallyHidden>loading</VisuallyHidden>

  return (
    <Layout title={data?.user.username || "user"}>
      <Box p={1}>
        <Heading>User</Heading>
        <Text>{data?.user.username} </Text>
        <Text>{data?.user.email} </Text>
        <Text>{data?.user.about} </Text>
      </Box>
    </Layout>
  )
}

export default AboutUserPage
