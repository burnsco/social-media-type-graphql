import { PostQuery, useMeQuery } from "@/generated/graphql"
import { Box, useColorModeValue } from "@chakra-ui/core"
import PostBody from "./Body"
import PostContainer from "./Container"
import PostFooter from "./Footer"
import PostHeader from "./Header"
import VoteBox from "./VoteBox"

const NewPost: React.FC<PostQuery> = props => {
  const { data } = useMeQuery()
  const bg = useColorModeValue("white", "#1A1A1B")
  const { post } = props
  const postId = (post?.id as string) ?? "1"
  const postScore = post?.totalVotes?.score ?? 0
  const postCategory = post?.category.name ?? null
  const postAuthor = post?.author.username ?? null
  const postCreatedTime = post?.createdAt ?? null
  const postTitle = post?.title ?? null
  const postText = post?.text ?? null
  const postLink = post?.link ?? null
  const postCommentsCount = post?.totalComments?.count ?? 0

  const isOwner = data?.me?.id === post?.author.id ?? false

  if (post) {
    return (
      <PostContainer bg={bg}>
        <VoteBox postId={postId} postScore={postScore} />
        <Box
          minH="100px"
          p={1}
          width="100%"
          display="flex"
          flexDir="column"
          justifyContent="space-evenly"
        >
          {isOwner ? (
            <PostHeader
              postId={postId}
              author={postAuthor}
              createdAt={postCreatedTime}
              category={postCategory}
            />
          ) : (
            <PostHeader
              author={postAuthor}
              createdAt={postCreatedTime}
              category={postCategory}
            />
          )}

          <PostBody title={postTitle} text={postText} link={postLink} />
          <PostFooter
            category={postCategory}
            id={postId}
            commentsCount={postCommentsCount}
          />
        </Box>
      </PostContainer>
    )
  }
  return null
}

export default NewPost
