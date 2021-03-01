import { useEditPostMutation } from "@/generated/graphql"
import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Heading,
  Link,
  Skeleton,
  Text
} from "@chakra-ui/react"
import Image from "next/image"

type PostBodyType = {
  title?: string | null
  text?: string | null
  link?: string | null
  image?: string | null
  postId?: string | null | undefined
}

const PostBody: React.FC<PostBodyType> = ({
  title,
  text,
  postId,
  link,
  image
}): JSX.Element => {
  const [editPost, { loading: submittingEditedPost }] = useEditPostMutation()

  function EditItemControls({ title, postId }: PostBodyType) {
    if (title) {
      if (postId) {
        return (
          <Heading fontWeight="500" fontSize="xl" px={1}>
            <Editable
              defaultValue={title || "Error"}
              submitOnBlur
              onSubmit={async props => {
                try {
                  const response = await editPost({
                    variables: {
                      data: {
                        title: props,
                        postId
                      }
                    }
                  })
                } catch (error) {
                  console.log(error)
                }
              }}
            >
              <EditablePreview />
              <EditableInput />
            </Editable>
          </Heading>
        )
      }
      return (
        <Heading fontWeight="500" fontSize="xl" px={1}>
          {title}
        </Heading>
      )
    }
    return null
  }

  return (
    <Flex direction="column" my={1} flexGrow={2} width="100%">
      <Skeleton isLoaded={!submittingEditedPost}>
        <EditItemControls title={title} postId={postId} />
      </Skeleton>

      {image ? (
        <Box p={2} mt={2}>
          <Image
            layout="intrinsic"
            src={image}
            width={700}
            height={475}
            alt={`image-${title}`}
          />
        </Box>
      ) : null}

      {text ? (
        <Text fontSize="sm" mt={1} noOfLines={4}>
          <EditItemControls text={text} />
        </Text>
      ) : null}

      {link ? (
        <Box mt={1}>
          <Link href={`${link}`}>{link}</Link>
        </Box>
      ) : null}
    </Flex>
  )
}

export default PostBody
