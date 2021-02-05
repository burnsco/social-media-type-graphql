import {
  Post,
  PostDocument,
  PostQuery,
  PostsDocument
} from "@/generated/graphql"
import { initializeApollo } from "@/lib/apolloClient"
import { GetStaticPaths, GetStaticProps } from "next"
import dynamic from "next/dynamic"

const DynamicSinglePostPage = dynamic(
  () => import("@/components/pages/SinglePost/SingePostPage"),
  { ssr: false }
)

const PostAndCommentsPage: React.FC = () => {
  return <DynamicSinglePostPage />
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo()

  await apolloClient.query<PostQuery>({
    query: PostDocument,
    variables: {
      postId: params?.id ?? null
    }
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      postId: params?.id ?? "1"
    },
    revalidate: 1
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query({
    query: PostsDocument
  })

  const paths =
    data.posts.map(
      (item: Post) => `/r/${item.category.name}/${item.category.id}`
    ) || []

  return {
    paths,
    fallback: "blocking"
  }
}

export default PostAndCommentsPage
