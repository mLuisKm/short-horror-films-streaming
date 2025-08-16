'use client'
import { useState } from 'react'
import styles from './RegisterForm.module.css'
import { hashPassword } from '@/utils/hasher'

export default function RegisterForm() {
    const [errors, setErrors] = useState({})
    const [gender, setGender] = useState('M')

    function validate(formData) {
        const newErrors = {}
        if (!formData.get('user-first-name')) newErrors.firstName = 'First name is required'
        if (!formData.get('user-last-name')) newErrors.lastName = 'Last name is required'
        if (!formData.get('user-email')) newErrors.email = 'Email is required'
        if (!formData.get('user-nickname')) newErrors.nickname = 'Nickname is required'
        if (!formData.get('user-password')) newErrors.password = 'Password is required'
        if (formData.get('user-password') !== formData.get('user-password-confirmation')) {
            newErrors.passwordConfirmation = 'Passwords do not match'
        }
        
        const today = new Date()
        const dob = new Date(formData.get('user-dob'))
        console.log(`Today: ${today}`)
        console.log(`DOB: ${dob}`)
        let age = today.getUTCFullYear - dob.getUTCFullYear()
        const monthDiff = today.getUTCMonth() - dob.getUTCMonth()
        const dayDiff = today.getUTCDate() - dob.getUTCDate()
        console.log(age)
        console.log(`${today.getUTCDate()} - ${dob.getUTCDate()} = ${dayDiff}`)
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            console.log('Subtracting one year from age')
            age--
        }
        console.log(age)
        if (age < 13) {
            newErrors.dob = 'You must be at least 13 years old'
        }
        return newErrors
    }

    function validateResponse(response) {
        const newErrors = {}
        if (response.reason.includes('CLIENTS_NICK_UK')) newErrors.nickname = 'Nickname already exists'
        if (response.reason.includes('CLIENTS_EMAIL_UK')) newErrors.email = 'Email already exists'
        return newErrors
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const validationErrors = validate(formData)
         if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }
        setErrors({})
        const data = {
            firstName: formData.get('user-first-name'),
            lastName: formData.get('user-last-name'),
            nickname: formData.get('user-nickname'),
            email: formData.get('user-email'),
            dob: formData.get('user-dob'),
            gender: gender,
            password: await hashPassword(formData.get('user-password')),
            }
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        const result = await response.json()
        if (response.ok) {
            console.log(result)
        } else {
            const responseErrors = validateResponse(result)
            setErrors(responseErrors)
            console.log("Registration failed:", result.reason)
        }
    }
    return (
        <div className={styles.formContainer}>
            <fieldset>
                <legend>YourHorrorFilms</legend>
                <div className={styles.formBody}>
                    <form id='register-form' onSubmit={handleSubmit}>
                        <div className={styles.formField}>
                            <label htmlFor="user-first-name">First Name</label>
                            <input type="text" name='user-first-name' />
                            {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
                        </div>
                        <div className={styles.formField}>
                            <label htmlFor="user-last-name">Last Name</label>
                            <input type="text" name='user-last-name' />
                            {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
                        </div>
                        <div className={styles.formField}>
                            <label htmlFor="user-nickname">Nickname</label>
                            <input type="text" name='user-nickname' />
                            {errors.nickname && <span className={styles.error}>{errors.nickname}</span>}
                        </div>
                        <div className={styles.formField}>
                            <label htmlFor="user-email">Email</label>
                            <input type="email" name='user-email' />
                            {errors.email && <span className={styles.error}>{errors.email}</span>}
                        </div>
                        <div className={styles.miniField}>
                            <div className={styles.formField}>
                                <label htmlFor='user-dob'>Date of Birth</label>
                                <input type="date" name='user-dob' />
                                {errors.dob && <span className={styles.error}>{errors.dob}</span>}
                            </div>
                            <div className={styles.formField}>
                                <label htmlFor='user-gender'>Gender</label>
                                <select name="user-gender" id="user-gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                                    <option value="M">M</option>
                                    <option value="F">F</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.formField}>
                            <label htmlFor="user-password">Password</label>
                            <input type="password" name='user-password' />
                        </div>
                        <div className={styles.formField}>
                            <label htmlFor="user-confirm-password">Confirm Password</label>
                            <input type="password" name='user-password-confirmation' />
                            {errors.passwordConfirmation && <span className={styles.error}>{errors.passwordConfirmation}</span>}
                        </div>
                        <div className={styles.formSubmit}>
                            <input type="submit" value="Register" className={styles.formButton}/>
                        </div>
                    </form>
                </div>
            </fieldset>
        </div>
    )
}