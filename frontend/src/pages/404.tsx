import dynamic from "next/dynamic"

const DynamicSinglePostPage = dynamic(() => import("@/components/common/404"))

const NotFoundPage = () => <DynamicSinglePostPage />

export default NotFoundPage
