import dynamic from "next/dynamic"

const DynamicEditPostPage = dynamic(
  () => import("@/components/pages/EditPost/EditPost")
)

const EditPostPage = () => <DynamicEditPostPage />

export default EditPostPage
