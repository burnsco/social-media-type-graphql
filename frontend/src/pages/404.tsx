import dynamic from "next/dynamic"

const DynamicSinglePostPage = dynamic(() => import("@/components/shared/404"))

const NotFoundPage = () => <DynamicSinglePostPage />

export default NotFoundPage
