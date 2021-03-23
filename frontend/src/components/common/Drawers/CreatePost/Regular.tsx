import { ChakraField } from "@/components/common/index"
import { PannelWrapper } from "@/components/pages/CreatePost/PanelWrapper"

export const RegularPost = () => (
  <PannelWrapper>
    <ChakraField
      label=""
      id="text"
      placeholder="text"
      aria-placeholder="post Text"
      name="text"
    />
  </PannelWrapper>
)
