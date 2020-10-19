import { useCreateVoteMutation } from "@/generated/graphql"
import { Box, Flex, IconButton } from "@chakra-ui/core"
import { useRouter } from "next/router"
import { memo } from "react"
import { ImArrowDown, ImArrowUp } from "react-icons/im"

const VoteBox: React.FC<{ postId: string; postScore: number }> = ({
  postId,
  postScore
}) => {
  const [vote, { loading, error }] = useCreateVoteMutation()
  const router = useRouter()
  const handleVote = async (value: number) => {
    try {
      const response = await vote({
        variables: { data: { value: value, postId: postId } }
      })
      return response
    } catch (ex) {
      console.log(ex)
    }
    return null
  }

  if (error) {
    console.log(error)
  }

  if (postId) {
    return (
      <Flex
        width="45px"
        flexDir="column"
        alignItems="center"
        p="2"
        height="100%"
      >
        <IconButton
          isDisabled={loading}
          onClick={() => handleVote(1)}
          variant="ghost"
          color="current"
          aria-label="UpVote"
          icon={<ImArrowUp />}
        />
        <Box>{postScore}</Box>
        <IconButton
          isDisabled={loading}
          onClick={() => handleVote(-1)}
          variant="ghost"
          color="current"
          aria-label="DownVote"
          icon={<ImArrowDown />}
        />
      </Flex>
    )
  }
  return null
}

export default memo(VoteBox)
