import Image from "next/image"
import styles from "./page.module.css"
import Carousel from "@/components/Carousel/Carousel"

export default function Home() {
    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.wellcomePage}>
                    <div className={styles.titleBackground}>
                        <h1 className={styles.title}>Welcome to YourHorrorFilms, the home of nightmares that keep you awake at night.</h1>
                    </div>
                    <div className={styles.subtitle1}>
                        <h2>Get the best horror shorts at a frighteningly attractive price.</h2>
                        <div className={styles.carousel}>
                            <Carousel/>
                        </div>
                        <h2>Also enjoy our free catalog by creating an account</h2>
                    </div>
                    <div className={styles.subtitle2}>
                        <h2>Or Unlock a chilling collection of shorts by getting your subscription.</h2>
                        <div className={styles.planContent}>
                            <div className={styles.plans}>
                                <h3 className={styles.planTitle}>Plan 1</h3>
                                <ul className={styles.planDetails}>
                                    <li>Get access to all the horror shorts for just $5/month.</li>
                                    <li>Create a child account or link with an existing account to share your subscription content</li>
                                    <li>Cancel anytime.</li>
                                </ul>
                            </div>
                            <div className={styles.plans}>
                                <h3 className={styles.planTitle}>Plan 2</h3>
                                <ul className={styles.planDetails}>
                                    <li>Get access to all the horror shorts for just $10/month.</li>
                                    <li>Create up to 3 child accounts or link with 3 existing accounts to share your subscription content</li>
                                    <li>Cancel anytime.</li>
                                </ul>
                            </div>
                            <div className={styles.plans}>
                                <h3 className={styles.planTitle}>Plan 1</h3>
                                <ul className={styles.planDetails}>
                                    <li>Get access to all the horror shorts for just $5/month.</li>
                                    <li>Create a child account or link with an existing account to share your subscription content</li>
                                    <li>Cancel anytime.</li>
                                </ul>
                            </div>
                            <div className={styles.plans}>
                                <h3 className={styles.planTitle}>Plan 2</h3>
                                <ul className={styles.planDetails}>
                                    <li>Get access to all the horror shorts for just $10/month.</li>
                                    <li>Create up to 3 child accounts or link with 3 existing accounts to share your subscription content</li>
                                    <li>Cancel anytime.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
