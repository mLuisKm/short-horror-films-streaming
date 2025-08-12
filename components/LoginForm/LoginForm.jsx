import styles from './LoginForm.module.css'

export default function LoginForm() {
    return (
        <div className={styles.formContainer}>
            <fieldset>
                <legend>YourHorrorFilms</legend>
                <div className={styles.formBody}>
                    <form action="">
                        <div className={styles.formField}>
                            <label htmlFor="user-nickname">Email or username</label>
                            <input type="text" />
                        </div>
                        <div className={styles.formField}>
                            <label htmlFor="user-password">Password</label>
                            <input type="text" />
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