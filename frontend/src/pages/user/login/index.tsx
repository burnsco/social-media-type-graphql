import dynamic from "next/dynamic"

const DynamicLoginPage = dynamic(() => import("@/components/Login/Login"))

const RegisterPage = () => <DynamicLoginPage />

export default RegisterPage
