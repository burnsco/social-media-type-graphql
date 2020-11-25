import { useCreateVoteMutation } from "@/generated/graphql"
import { Flex, IconButton, Text, useColorModeValue } from "@chakra-ui/core"
import { ImArrowDown, ImArrowUp } from "react-icons/im"

const VoteBox: React.FC<{
  postId?: string
  postScore?: number
  isLoggedIn?: boolean
}> = ({ postId, postScore, isLoggedIn }) => {
  const bg = useColorModeValue("gray.50", "#313131")
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
          isDisabled={loading || !isLoggedIn}
          onClick={async () => {
            await vote({
              variables: { data: { value: 1, postId } }
            })
          }}
          variant="ghost"
          color="current"
          aria-label="Up Vote"
          icon={<ImArrowUp />}
        />

        <Text fontSize="sm">{postScore}</Text>
        <IconButton
          size="sm"
          isDisabled={loading || !isLoggedIn}
          onClick={async () => {
            await vote({
              variables: { data: { value: -1, postId } }
            })
          }}
          variant="ghost"
          color="current"
          aria-label="Down Vote"
          icon={<ImArrowDown />}
        />
      </Flex>
    )
  }
  return null
}

export default VoteBox
