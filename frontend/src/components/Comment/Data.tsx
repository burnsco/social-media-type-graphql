import { NetworkStatus } from "@apollo/client"
import { Box, Spinner, Stack } from "@chakra-ui/core"
import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import PropTypes from "prop-types"
import * as React from "react"
import CommentPage from "."
import {
  CategoriesDocument,
  Category,
  PostsDocument,
  PostsQuery,
  useCommentsQuery
} from "../../generated/graphql"
import { initializeApollo } from "../../lib/apolloClient"

const CommentsPageWithData: React.FC<{ postId: string }> = ({ postId }) => {
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [isMounted])

  const { loading, data, error, fetchMore, networkStatus } = useCommentsQuery({
    variables: {
      postId: postId,
      skip: 0,
      first: 4
    },
    notifyOnNetworkStatusChange: true,
    skip: !isMounted
  })

  const loadingMoreComments = networkStatus === NetworkStatus.fetchMore

  const loadMoreComments = () => {
    fetchMore({
      variables: {
        skip: comments?.length ?? 0
      }
    })
  }

  const router = useRouter()

  if (router.isFallback) {
    return <Spinner />
  }

  if (error) return <div>error loading posts</div>

  if (loading && !loadingMoreComments) return null

  const comments = data?.comments ?? []
  const areMorePosts = (comments?.length ?? 1) < (comments?.length ?? 0)

  return (
    <Box>
      {comments.length > 0 && (
        <Stack spacing={8}>
          {comments.map((comment, index) => (
            <CommentPage
              key={`comment-${comment.id}-${index}`}
              comment={comment}
            />
          ))}
          {areMorePosts && (
            <button
              onClick={() => loadMoreComments()}
              disabled={loadingMoreComments}
            >
              {loadingMoreComments ? "Loading..." : "Show More"}
            </button>
          )}
        </Stack>
      )}
    </Box>
  )
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
    revalidate: 10
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
    fallback: false
  }
}

CommentsPageWithData.propTypes = {
  postId: PropTypes.string.isRequired
}

export default CommentsPageWithData
