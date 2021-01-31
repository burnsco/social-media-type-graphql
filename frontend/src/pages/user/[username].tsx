import { User, UsersDocument, UsersQuery } from "@/generated/graphql"
import { initializeApollo } from "@/lib/apolloClient"
import { GetStaticPaths, GetStaticProps } from "next"
import dynamic from "next/dynamic"
import { addApolloState } from "../../lib/apolloClient"

const DynamicAboutUserPage = dynamic(
  () => import("@/components/pages/User/AboutUser")
)

const AboutUser = () => <DynamicAboutUserPage />

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query({
    query: UsersDocument
  })

  const paths = data.users.map((item: User) => `/user/${item.username}`) || []

  return {
    paths,
    fallback: "blocking"
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo()

  await apolloClient.query<UsersQuery>({
    query: UsersDocument,
    variables: {
      userId: params?.username ?? null
    }
  })

  if (params && params.username) {
    const state = await addApolloState(apolloClient, {
      props: {
        userId: params.username
      },
      revalidate: 10
    })
    return state
  } else {
    return null
  }
}

export default AboutUser
