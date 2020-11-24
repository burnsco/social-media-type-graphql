import { UsersDocument, UsersQuery } from "@/generated/graphql"
import { initializeApollo } from "@/lib/apolloClient"
import { GetStaticProps } from "next"
import dynamic from "next/dynamic"

const DynamicAboutUserPage = dynamic(
  () => import("@/components/User/AboutUser")
)

const AboutUser = () => <DynamicAboutUserPage />

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

export default AboutUser
