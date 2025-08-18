"use client"
import LoginForm from "../LoginForm/LoginForm";
import { useSession } from "next-auth/react"

export default function GeneralForm() {
    const { data: session } = useSession()
    console.log("Session:", session)
    return <LoginForm />
}