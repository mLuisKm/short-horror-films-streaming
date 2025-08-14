'use client';
import { useState } from 'react';
import styles from './RegisterForm.module.css';
import { hashPassword } from '@/utils/hasher';

export default function RegisterForm() {
    const [gender, setGender] = useState('M');
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
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
        });
        const result = await response.json();
        console.log(result);
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
                        </div>
                        <div className={styles.formField}>
                            <label htmlFor="user-last-name">Last Name</label>
                            <input type="text" name='user-last-name' />
                        </div>
                        <div className={styles.formField}>
                            <label htmlFor="user-nickname">Nickname</label>
                            <input type="text" name='user-nickname' />
                        </div>
                        <div className={styles.formField}>
                            <label htmlFor="user-email">Email</label>
                            <input type="email" name='user-email' />
                        </div>
                        <div className={styles.miniField}>
                            <div className={styles.formField}>
                                <label htmlFor='user-dob'>Date of Birth</label>
                                <input type="date" name='user-dob' />
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
                        </div>
                        <div className={styles.formSubmit}>
                            <input type="submit" value="Register" className={styles.formButton}/>
                        </div>
                    </form>
                </div>
            </fieldset>
        </div>
    );
}