import { useCreateVoteMutation } from "@/generated/graphql"
import { Flex, IconButton, Text, useColorModeValue } from "@chakra-ui/core"
import { ImArrowDown, ImArrowUp } from "react-icons/im"

const VoteBox: React.FC<{ postId: string; postScore: number }> = ({
  postId,
  postScore
}) => {
  const bg = useColorModeValue("gray.50", "gray.900")
  const [vote, { loading }] = useCreateVoteMutation()

  if (postId) {
    return (
      <Flex
        bg={bg}
        width="45px"
        flexDir="column"
        alignItems="center"
        p={1}
        minH="100%"
      >
        <IconButton
          size="sm"
          isDisabled={loading}
          onClick={async () => {
            await vote({
              variables: { data: { value: 1, postId } }
            })
          }}
          variant="ghost"
          color="current"
          aria-label="UpVote"
          icon={<ImArrowUp />}
        />
        <Text fontSize="sm" fontWeight="bold" opacity="0.9">
          {postScore}
        </Text>
        <IconButton
          size="sm"
          isDisabled={loading}
          onClick={async () => {
            await vote({
              variables: { data: { value: -1, postId } }
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
  return null
}

export default VoteBox
