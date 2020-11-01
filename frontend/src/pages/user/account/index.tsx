import dynamic from "next/dynamic"

const DynamicAccountPage = dynamic(() => import("@/components/Account/Account"))

const AccountPage = () => <DynamicAccountPage />

export default AccountPage
