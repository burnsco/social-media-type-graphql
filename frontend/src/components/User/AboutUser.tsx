import Layout from "@/components/Layout"
import { Box, Heading, Text } from "@chakra-ui/core"
import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import {
  User,
  UsersDocument,
  UsersQuery,
  useUserQuery
} from "../../generated/graphql"
import { initializeApollo } from "../../lib/apolloClient"

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
      userId: params?.id ?? "1"
    }
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      userId: params?.id ?? "1"
    },
    revalidate: 1
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query({
    query: UsersDocument
  })

  const paths = data.users.map((user: User) => `/users/${user.username}`) || []

  return {
    paths,
    fallback: "blocking"
  }
}

export default AboutUserPage
