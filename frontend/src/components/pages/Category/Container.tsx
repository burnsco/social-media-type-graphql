import Layout from "@/components/ui/Layout"
import CategoryPosts from "./Category"

const CategoryPostListContainer: React.FC<{ title: string }> = ({
  title = "reddit"
}) => {
  return (
    <Layout title={title}>
      <CategoryPosts />
    </Layout>
  )
}

export default CategoryPostListContainer
