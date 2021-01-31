import {
  CategoriesDocument,
  Category,
  PostsDocument,
  PostsQuery
} from "@/generated/graphql"
import { addApolloState, initializeApollo } from "@/lib/apolloClient"
import { GetStaticPaths, GetStaticProps } from "next"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"

const DynamicCategoryPage = dynamic(
  () => import("@/components/pages/Category/index"),
  { ssr: false }
)

const CategoryPage = () => {
  const router = useRouter()

  return <DynamicCategoryPage title={router.asPath} />
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo()

  await apolloClient.query<PostsQuery>({
    query: PostsDocument,
    variables: {
      category: params?.category ?? null,
      skip: 0,
      first: 2
    }
  })

  return addApolloState(apolloClient, {
    props: {
      category: params?.category ?? null
    },
    revalidate: 1
  })
}

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query({
    query: CategoriesDocument
  })

  const paths = data.categories.map((item: Category) => `/r/${item.name}`)

  return {
    paths,
    fallback: "blocking"
  }
}

export default CategoryPage
