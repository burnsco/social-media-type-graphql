import { ChakraField } from "@/components/common/index"
import { PannelWrapper } from "@/components/pages/CreatePost/PanelWrapper"

export const LinkPost = () => (
  <PannelWrapper>
    <ChakraField
      label=""
      id="link"
      name="link"
      placeholder="link"
      aria-placeholder="Post Link"
    />
  </PannelWrapper>
)
