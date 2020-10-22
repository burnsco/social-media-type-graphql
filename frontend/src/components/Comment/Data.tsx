import {
  CategoriesDocument,
  Category,
  PostsDocument,
  PostsQuery,
  useCommentsQuery
} from "@/generated/graphql"
import { initializeApollo } from "@/lib/apolloClient"
import { NetworkStatus } from "@apollo/client"
import { Alert, Box, Stack, Text } from "@chakra-ui/core"
import { GetStaticPaths, GetStaticProps } from "next"
import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import CommentPage from "."
import ShowMoreComments from "./ShowMore"

const CommentsPageWithData: React.FC<{ postId: string }> = ({ postId }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
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

  if (error) return <Alert status="error">{error.message}</Alert>
  if (loading && !loadingMoreComments) return null

  const comments = data?.comments ?? []
  const areMoreComments = (comments?.length ?? 1) < (comments?.length ?? 0)

  const loadMoreComments = () => {
    fetchMore({
      variables: {
        skip: data?.comments?.length ?? 0
      }
    })
  }

  const ViewComments = () => {
    if (comments.length > 0) {
      return (
        <Box>
          <Stack spacing={8}>
            {comments.map((comment, index) => (
              <CommentPage
                key={`comment-${comment.id}-${index}`}
                comment={comment}
              />
            ))}
          </Stack>
        </Box>
      )
    }
    return <Text>No comments yet.</Text>
  }

  if (isMounted) {
    return (
      <Box>
        <ViewComments />
        <ShowMoreComments
          loadMoreComments={loadMoreComments}
          areMoreComments={areMoreComments}
          loadingMoreComments={loadingMoreComments}
        />
      </Box>
    )
  }
  return null
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo()

  await apolloClient.query<PostsQuery>({
    query: PostsDocument,
    variables: {
      category: params?.category ?? "movies",
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
    fallback: false
  }
}

CommentsPageWithData.propTypes = {
  postId: PropTypes.string.isRequired
}

export default CommentsPageWithData
