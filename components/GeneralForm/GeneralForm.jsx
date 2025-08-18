"use client"
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import { useSession, signOut } from "next-auth/react"

export default function GeneralForm() {
    const { data: session } = useSession()
    console.log("Session:", session)
    if (session) {
        console.log("Session data:", session)
        return (
            <div>
                <h1>Hola, estas logueado</h1>
                <button onClick={() => signOut()}>Sign out</button>
            </div>
        )
    }
    return <LoginForm />
}