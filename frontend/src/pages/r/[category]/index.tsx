import {
  CategoriesDocument,
  Category,
  PostsDocument,
  PostsQuery
} from "@/generated/graphql"
import { initializeApollo } from "@/lib/apolloClient"
import { GetStaticPaths, GetStaticProps } from "next"
import dynamic from "next/dynamic"

const DynamicCategoryPage = dynamic(
  () => import("@/components/Category/Category")
)

const CategoryPage = () => <DynamicCategoryPage />

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo()

  await apolloClient.query<PostsQuery>({
    query: PostsDocument,
    variables: {
      category: params?.category ?? "react",
      skip: 0,
      first: 4
    }
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      category: params?.category ?? "react"
    },
    revalidate: 1
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query({
    query: CategoriesDocument
  })

  const paths = data.categories.map((item: Category) => `/r/${item.name}`)

  return {
    paths,
    fallback: true
  }
}

export default CategoryPage
