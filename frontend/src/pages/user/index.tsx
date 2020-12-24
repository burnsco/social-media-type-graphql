import dynamic from "next/dynamic"

const DynamicUserPage = dynamic(() => import("@/components/pages/Me/Me"))

const UserPage: React.FC = () => {
  return <DynamicUserPage />
}

export default UserPage
