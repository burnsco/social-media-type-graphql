import dynamic from "next/dynamic"
import Layout from "../Layout"

const DynamicPosts = dynamic(() => import("./Posts"))

const PostList = () => {
  return (
    <Layout title="Home">
      <DynamicPosts />
    </Layout>
  )
}

export default PostList
