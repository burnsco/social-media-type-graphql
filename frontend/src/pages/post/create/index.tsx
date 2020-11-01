import dynamic from "next/dynamic"

const DynamicCreatePostPage = dynamic(
  () => import("@/components/CreatePost/index")
)

const CreatePostPage = () => <DynamicCreatePostPage />

export default CreatePostPage
