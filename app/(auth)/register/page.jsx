import PageIdentifier from "@/components/PageIdentifier/PageIdentifier"
import PageDescription from "@/components/PageDescription/PageDescription"
import RegisterForm from "@/components/RegisterForm/RegisterForm"
export default function Register() {
    return (
        <PageIdentifier nombre="Register">
            <PageDescription description="register a new account"/>
            <RegisterForm/>
        </PageIdentifier>
    )
}