import { PostQuery } from "@/generated/graphql"
import { Box, useColorModeValue } from "@chakra-ui/core"
import PostBody from "./Body"
import PostContainer from "./Container"
import PostFooter from "./Footer"
import PostHeader from "./Header"
import PostComments from "./PostComments"
import VoteBox from "./VoteBox"

interface NewPostProps extends PostQuery {
  fullStyle?: boolean
  postId: string
}

const NewPost: React.FC<NewPostProps> = props => {
  const bg = useColorModeValue("white", "#1A1A1B")
  const { post } = props
  const postId = (post?.id as string) ?? "0"
  const postScore = post?.totalVotes?.score ?? 0
  const postCategory = post?.category.name ?? null
  const postAuthor = post?.author.username ?? null
  const postCreatedTime = post?.createdAt ?? null
  const postTitle = post?.title ?? null
  const postText = post?.text ?? null
  const postLink = post?.link ?? null
  const postCommentsCount = post?.totalComments?.count ?? 0
  return (
    <PostContainer bg={bg}>
      <VoteBox postId={postId} postScore={postScore} />
      <Box
        mt={1}
        minH="100px"
        p={2}
        width="100%"
        display="flex"
        flexDir="column"
        justifyContent="space-evenly"
      >
        <PostHeader
          author={postAuthor}
          createdAt={postCreatedTime}
          category={postCategory}
        />
        <PostBody title={postTitle} text={postText} link={postLink} />
        <PostFooter
          category={postCategory}
          id={postId}
          commentsCount={postCommentsCount}
        />
        <PostComments fullStyle postId={props.postId} />
      </Box>
    </PostContainer>
  )
}

export default NewPost
