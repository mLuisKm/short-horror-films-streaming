'use client'
import { useState } from 'react'
import styles from './LoginForm.module.css'

export default function LoginForm() {
    const handlesubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const data = {
            emailOrNickname: formData.get('user-identifier'),
            password: formData.get('user-password')
        }
        console.log('Login data:', data)
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const result = await response.json()
        if (response.ok) {
            console.log("Login successful:", {result})
            // Handle successful login, e.g., redirect or show a success message
        } else {
            console.error("Login failed:", result.reason)
            // Handle login failure, e.g., show an error message
        }
    }
    return (
        <div className={styles.formContainer}>
            <fieldset>
                <legend>YourHorrorFilms</legend>
                <div className={styles.formBody}>
                    <form id='login-form' onSubmit={handlesubmit}>
                        <div className={styles.formField}>
                            <label htmlFor="user-nickname">Email or username</label>
                            <input type="text" name='user-identifier'/>
                        </div>
                        <div className={styles.formField}>
                            <label htmlFor="user-password">Password</label>
                            <input type="text" name='user-password'/>
                        </div>
                        <div className={styles.formSubmit}>
                            <input type="submit" value="Log in" className={styles.formButton}/>
                        </div>
                    </form>
                </div>
            </fieldset>
        </div>
    )
}