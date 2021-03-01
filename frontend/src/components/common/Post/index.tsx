import { PostQuery, useMeQuery } from "@/generated/graphql"
import { Flex, useColorModeValue } from "@chakra-ui/react"
import { memo } from "react"
import PostBody from "./Body"
import PostContainer from "./Container"
import PostFooter from "./Footer"
import PostHeader from "./Header"
import VoteBox from "./VoteBox"

const NewPost: React.FC<PostQuery> = props => {
  const bg = useColorModeValue("white", "#202020")

  const { data } = useMeQuery()
  const { post } = props

  const postId = post?.id
  const postScore = post?.totalVotes?.score ?? 0
  const postCategory = post?.category.name
  const postAuthor = post?.author.username
  const postCreatedTime = post?.createdAt
  const postTitle = post?.title
  const postText = post?.text
  const postImage = post?.image
  const postLink = post?.link
  const postCommentsCount = post?.totalComments?.count ?? 0
  const isOwner = data?.me?.id === post?.author.id ?? false
  const isLoggedIn = data?.me?.username !== null

  return (
    <PostContainer bg={bg}>
      <VoteBox postId={postId} postScore={postScore} isLoggedIn={isLoggedIn} />
      <Flex minH="160px" width="100%" flexDir="column" ml={3}>
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
        {isOwner ? (
          <PostBody
            postId={postId}
            image={postImage}
            title={postTitle}
            text={postText}
            link={postLink}
          />
        ) : (
          <PostBody
            image={postImage}
            title={postTitle}
            text={postText}
            link={postLink}
          />
        )}

        <PostFooter
          category={postCategory}
          id={postId}
          commentsCount={postCommentsCount}
        />
      </Flex>
    </PostContainer>
  )
}

export default memo(NewPost)
