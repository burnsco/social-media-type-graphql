import {
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton
} from "@chakra-ui/core"

const EditPostControls: React.FC<{ title: string }> = ({ title }) => {
  function EditableControls({ isEditing, onSubmit, onCancel, onEdit }: any) {
    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton name="check" onClick={onSubmit} aria-label="check" />
        <IconButton name="close" onClick={onCancel} aria-label="close" />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton size="sm" name="edit" onClick={onEdit} aria-label="edit" />
      </Flex>
    )
  }

  return (
    <Editable
      textAlign="center"
      defaultValue={title}
      fontSize="2xl"
      isPreviewFocusable={false}
      submitOnBlur={false}
    >
      {(props: any) => (
        <>
          <EditablePreview />
          <EditableInput />
          <EditableControls {...props} />
        </>
      )}
    </Editable>
  )
}

export default EditPostControls
