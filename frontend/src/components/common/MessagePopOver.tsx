import {
  Button,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger
} from "@chakra-ui/react"
import React from "react"

export default function NewPrivateMessagePopOver() {
  const [isOpen, setIsOpen] = React.useState(false)
  const open = () => setIsOpen(!isOpen)
  const close = () => setIsOpen(false)
  const ref = React.useRef()
  return (
    <>
      <Popover
        isLazy
        returnFocusOnClose={false}
        isOpen={isOpen}
        onClose={close}
        placement="auto-start"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Button onClick={open}>Trigger</Button>
        </PopoverTrigger>

        <PopoverContent>
          <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody minH="100px">
            Are you sure you want to continue with your action?
          </PopoverBody>
          <PopoverFooter d="flex" justifyContent="flex-end">
            <Input />
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  )
}
