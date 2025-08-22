"use client"
import { useSession, signOut } from "next-auth/react"

export default function SignOutButton() {
    const { data: session } = useSession()
    if (!session) {
        return null
    }

    return (
        <div>
            <h1>Hola, estas logueado</h1>
            <button onClick={() => signOut()} className="sign-out-button">
                Sign Out
            </button>
        </div>
    )
}