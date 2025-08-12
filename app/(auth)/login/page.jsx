import PageIdentifier from "@/components/PageIdentifier/PageIdentifier"
import PageDescription from "@/components/PageDescription/PageDescription"
import LoginForm from "@/components/LoginForm/LoginForm"
export default function Login() {
    return (
        <PageIdentifier nombre="Login">
            <PageDescription description="log in and access your content"/>
            <LoginForm/>
        </PageIdentifier>
    )
}