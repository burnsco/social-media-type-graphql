import Layout from "@/components/Layout"
import dynamic from "next/dynamic"

const DynamicPosts = dynamic(() => import("./Posts"))

const PostList = () => {
  return (
    <Layout title="Home">
      <DynamicPosts />
    </Layout>
  )
}

export default PostList
