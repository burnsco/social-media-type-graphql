import NewPost from "@/components/Post"
import ShowMorePosts from "@/components/PostList/showMore"
import SEO from "@/components/shared/seo"
import {
  CategoriesDocument,
  Category,
  PostsDocument,
  PostsQuery,
  usePostsQuery
} from "@/generated/graphql"
import { initializeApollo } from "@/lib/apolloClient"
import { NetworkStatus } from "@apollo/client"
import { Alert, AlertIcon, Skeleton, VStack } from "@chakra-ui/core"
import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import { FaSpider } from "react-icons/fa"

const CategoryPage: React.FC<{ category: string }> = ({ category }) => {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [isMounted])

  const { loading, data, error, fetchMore, networkStatus } = usePostsQuery({
    variables: {
      category: category,
      skip: 0,
      first: 4
    },
    notifyOnNetworkStatusChange: true,
    skip: !isMounted
  })

  if (router.isFallback) {
    return <div>Loading....</div>
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    )
  }

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore
  if (loading && !loadingMorePosts) return <FaSpider />

  const loadMorePosts = () => {
    fetchMore({
      variables: {
        skip: postsBySubreddit?.length ?? 0
      }
    })
  }

  const postsBySubreddit = data?.posts ?? []
  const _categoryPostsMeta = data?._categoryPostsMeta
  const areMorePosts =
    (postsBySubreddit?.length ?? 1) < (_categoryPostsMeta?.count ?? 0)

  const ViewPosts = () => {
    if (postsBySubreddit.length > 0) {
      return (
        <VStack spacing={4}>
          {postsBySubreddit.map((post, index) => (
            <NewPost key={`post-${post.id}-${index}`} post={post} />
          ))}
        </VStack>
      )
    }
    return <div>No posts here.</div>
  }

  if (isMounted) {
    return (
      <>
        <SEO
          title={category}
          description="A typescript/react clone to learn graphql, postgres, apollo and more."
        />
        <Skeleton isLoaded={!loading}>
          <ViewPosts />
          <ShowMorePosts
            loadMorePosts={loadMorePosts}
            areMorePosts={areMorePosts}
            loadingMorePosts={loadingMorePosts}
          />
        </Skeleton>
      </>
    )
  }
  return null
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo()

  await apolloClient.query<PostsQuery>({
    query: PostsDocument,
    variables: {
      category: params?.category ?? "funny",
      skip: 0,
      first: 4
    }
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      category: params?.category
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

CategoryPage.propTypes = {
  category: PropTypes.string.isRequired
}

export default CategoryPage
