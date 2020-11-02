import Layout from "@/components/Layout"
import { UsersDocument, UsersQuery, useUserQuery } from "@/generated/graphql"
import { initializeApollo } from "@/lib/apolloClient"
import { Box, Heading, Text } from "@chakra-ui/core"
import { GetStaticProps } from "next"
import { useRouter } from "next/router"

const AboutUserPage = () => {
  const router = useRouter()
  const username = router.query.username
  const { data, loading } = useUserQuery({
    variables: { data: { username: username as string } }
  })

  if (loading) return null

  if (data && data.user) {
    return (
      <Layout title={data.user.username}>
        <Box>
          <Heading>User</Heading>

          <Text>{data.user.username} </Text>
          <Text>{data.user.email} </Text>
          <Text>{data.user.about} </Text>
        </Box>
      </Layout>
    )
  }
  return null
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo()

  await apolloClient.query<UsersQuery>({
    query: UsersDocument,
    variables: {
      userId: params?.username ?? "1"
    }
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      userId: params?.username ?? "1"
    },
    revalidate: 1
  }
}

export default AboutUserPage
