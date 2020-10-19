import { useCreateVoteMutation } from "@/generated/graphql"
import { Box, Flex, IconButton } from "@chakra-ui/core"
import { memo } from "react"
import { ImArrowDown, ImArrowUp } from "react-icons/im"

const VoteBox: React.FC<{ postId: string; postScore: number }> = ({
  postId,
  postScore
}) => {
  const [vote, { loading }] = useCreateVoteMutation()

  return (
    <Flex width="45px" flexDir="column" alignItems="center" p="2" height="100%">
      <IconButton
        isDisabled={loading}
        onClick={() => {
          vote({
            variables: { data: { value: 1, postId: postId } }
          })
        }}
        variant="ghost"
        color="current"
        aria-label="UpVote"
        icon={<ImArrowUp />}
      />
      <Box>{postScore}</Box>
      <IconButton
        isDisabled={loading}
        onClick={() => {
          vote({
            variables: { data: { value: -1, postId: postId } }
          })
        }}
        variant="ghost"
        color="current"
        aria-label="DownVote"
        icon={<ImArrowDown />}
      />
    </Flex>
  )
}

export default memo(VoteBox)
