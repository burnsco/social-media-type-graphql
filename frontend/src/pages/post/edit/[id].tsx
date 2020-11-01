import dynamic from "next/dynamic"

const DynamicEditPostPage = dynamic(
  () => import("@/components/EditPost/EditPost")
)

const EditPostPage = () => <DynamicEditPostPage />

export default EditPostPage
