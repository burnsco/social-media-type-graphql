import dynamic from "next/dynamic"

const DynamicAboutUserPage = dynamic(
  () => import("@/components/User/AboutUser")
)

const AboutUser = () => <DynamicAboutUserPage />

export default AboutUser
