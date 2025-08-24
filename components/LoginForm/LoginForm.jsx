'use client'
import styles from './LoginForm.module.css'
import Link from 'next/link'
import { useRouter } from "next/navigation";
import { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react'
import { useState } from 'react';

export default function LoginForm() {
    const [errorMessage, setErrorMessage] = useState(null);
    const { data: session } = useSession()
    const router = useRouter()
    useEffect(() => {
        if (session) {
            router.push("/")
        }
    }, [session, router])
    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const response = await signIn("credentials", {
            redirect: false,
            emailOrNickname: formData.get('user-identifier'),
            password: formData.get('user-password')
        })
        if (response.error) {
            setErrorMessage("Invalid credentials. Please try again.")
        } else {
            setErrorMessage(null)
        }
    }
    return (
        <div className={styles.formContainer}>
            <fieldset className={styles.formFieldset}>
                <legend>Your Horror Films</legend>
                <div className={styles.formBody}>
                    <form id='login-form' onSubmit={handleSubmit}>
                        <div className={styles.error}>{errorMessage}</div>
                        <div className={styles.formField}>
                            <label htmlFor="user-nickname" className={styles.fieldLabel}>Email or username</label>
                            <input type="text" name='user-identifier' className={styles.fieldInput}/>
                        </div>
                        <div className={styles.formField}>
                            <label htmlFor="user-password" className={styles.fieldLabel}>Password</label>
                            <input type="password" name='user-password' className={styles.fieldInput}/>
                        </div>
                        <div className={styles.formSubmit}>
                            <input type="submit" value="Log in" className={styles.formButton}/>
                        </div>
                    </form>
                </div>
                <div className={styles.formFooter}>
                    <p>Don't have an account?</p>
                    <Link href="/register" className={styles.link}>Register</Link>
                </div>
            </fieldset>
        </div>
    )
}