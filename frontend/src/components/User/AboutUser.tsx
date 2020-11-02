import Layout from "@/components/Layout"
import { UsersDocument, UsersQuery, useUserQuery } from "@/generated/graphql"
import { initializeApollo } from "@/lib/apolloClient"
import { Box, Heading, Skeleton, Text } from "@chakra-ui/core"
import { GetStaticProps } from "next"
import { useRouter } from "next/router"

const AboutUserPage = () => {
  const router = useRouter()
  const username = router.query.username
  const { data, loading } = useUserQuery({
    variables: { data: { username: username as string } }
  })

  if (data && data.user) {
    return (
      <Layout title={data.user.username}>
        <Skeleton isLoaded={!loading}>
          <Box>
            <Heading>User</Heading>

            <Text>{data.user.username} </Text>
            <Text>{data.user.email} </Text>
            <Text>{data.user.about} </Text>
          </Box>
        </Skeleton>
      </Layout>
    )
  }
  return <Text>No user found</Text>
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
