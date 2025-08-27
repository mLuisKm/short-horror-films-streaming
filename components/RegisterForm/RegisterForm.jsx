'use client'
import { useState } from 'react'
import Link from 'next/link'
import styles from './RegisterForm.module.css'
import { hashPassword } from '@/utils/hasher'
import { useRouter } from "next/navigation";
import { useEffect } from 'react';
import { useSession } from 'next-auth/react'

export default function RegisterForm() {
    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (session) {
            router.push("/")
        }
    }, [session, router])

    const [errors, setErrors] = useState({})
    const [gender, setGender] = useState('M')

    function validate(formData) {
        const newErrors = {}
        if (!formData.get('user-first-name')) newErrors.firstName = 'First name is required'
        if (!formData.get('user-last-name')) newErrors.lastName = 'Last name is required'
        if (!formData.get('user-email')) newErrors.email = 'Email is required'
        if (!formData.get('user-nickname')) newErrors.nickname = 'Nickname is required'
        if (!formData.get('user-password')) newErrors.password = 'Password is required'
        if (!formData.get('user-dob')) newErrors.dob = 'Date of birth is required'
        if (formData.get('user-password') !== formData.get('user-password-confirmation')) {
            newErrors.passwordConfirmation = 'Passwords do not match'
        }
        if (formData.get('user-email') && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.get('user-email'))) {
            newErrors.email = 'Invalid email address'
        }
        
        const today = new Date()
        const dob = new Date(formData.get('user-dob'))
        let age = today.getUTCFullYear() - dob.getUTCFullYear()
        const monthDiff = today.getUTCMonth() - dob.getUTCMonth()
        const dayDiff = today.getUTCDate() - dob.getUTCDate()
        console.log(`Años: ${today.getUTCFullYear()}-${dob.getUTCFullYear()}=${age}`)
        console.log(`Meses: ${today.getUTCMonth()}-${dob.getUTCMonth()}=${monthDiff}`)
        console.log(`Dias: ${today.getUTCDate()}-${dob.getUTCDate()}=${dayDiff}`)
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--
        }
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
        if (!response.ok) {
            const responseErrors = validateResponse(result)
            setErrors(responseErrors)
        } else {
            setErrors({ success: 'Registration successful! Redirecting to login...' })
            router.push('/authenticate')
        }
    }
    return (
        <div className={styles.formContainer}>
            <fieldset className={styles.formFieldset}>
                <legend>Your Horror Films</legend>
                <div className={styles.formBody}>
                    <form id='register-form' onSubmit={handleSubmit}>
                        <div className={styles.formField}>
                            <label htmlFor="user-first-name" className={styles.fieldLabel}>First Name</label>
                            <input type="text" name='user-first-name' className={styles.fieldInput}/>
                            {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
                        </div>
                        <div className={styles.formField}>
                            <label htmlFor="user-last-name" className={styles.fieldLabel}>Last Name</label>
                            <input type="text" name='user-last-name' className={styles.fieldInput}/>
                            {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
                        </div>
                        <div className={styles.formField}>
                            <label htmlFor="user-nickname" className={styles.fieldLabel}>Nickname</label>
                            <input type="text" name='user-nickname' className={styles.fieldInput}/>
                            {errors.nickname && <span className={styles.error}>{errors.nickname}</span>}
                        </div>
                        <div className={styles.formField}>
                            <label htmlFor="user-email" className={styles.fieldLabel}>Email</label>
                            <input type="email" name='user-email' className={styles.fieldInput}/>
                            {errors.email && <span className={styles.error}>{errors.email}</span>}
                        </div>
                        <div className={styles.miniField}>
                            <div className={styles.formField}>
                                <label htmlFor='user-dob' className={styles.fieldLabel}>Date of Birth</label>
                                <input type="date" name='user-dob' className={styles.fieldInput}/>
                                {errors.dob && <span className={styles.error}>{errors.dob}</span>}
                            </div>
                            <div className={styles.formField}>
                                <label htmlFor='user-gender' className={styles.fieldLabel}>Gender</label>
                                <select name="user-gender" id="user-gender" className={styles.fieldInput} value={gender} onChange={(e) => setGender(e.target.value)}>
                                    <option value="M">M</option>
                                    <option value="F">F</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.formField}>
                            <label htmlFor="user-password" className={styles.fieldLabel}>Password</label>
                            <input type="password" name='user-password' className={styles.fieldInput}/>
                        </div>
                        <div className={styles.formField}>
                            <label htmlFor="user-confirm-password" className={styles.fieldLabel}>Confirm Password</label>
                            <input type="password" name='user-password-confirmation' className={styles.fieldInput}/>
                            {errors.passwordConfirmation && <span className={styles.error}>{errors.passwordConfirmation}</span>}
                        </div>
                        <div className={styles.formSubmit}>
                            <input type="submit" value="Register" className={styles.formButton}/>
                        </div>
                        <div className={styles.successMessage}>
                            {errors.success && <span className={styles.success}>{errors.success}</span>}
                        </div>
                    </form>
                </div>
                <div className={styles.formFooter}>
                    <p>Already have an account?</p>
                    <Link href="/authenticate" className={styles.link}>Log in</Link>
                </div>
            </fieldset>
        </div>
    )
}