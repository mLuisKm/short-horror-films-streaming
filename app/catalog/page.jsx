import styles from "./catalog.module.css"
import FilmCard from "@/components/FilmCard/FilmCard"

export default async function Catalog() {
    const request = await fetch('http://localhost:3000/api/films')
    const result = await request.json()
    console.log(result)
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <h2>Welcome to the Catalog</h2>
                    <p>Explore our wide range of products and services.</p>
                </div>
                <div className={styles.productCategories}>
                    {/* Subscriptions */}
                    <div className={styles.subscriptionHeader}>
                        <h2>Subscription Plans</h2>
                        <p>Choose a plan that suits you best.</p>
                    </div>
                    <div className={styles.subscriptions}>
                        <div className={styles.silverPlan}>
                            <h3 className={styles.planTitle}>Silver Plan</h3>
                            <ul className={styles.planDetails}>
                                <li>Get access to all the horror shorts for just $5/month.</li>
                                <li>Create a child account or link with an existing account to share your subscription content</li>
                                <li>Cancel anytime.</li>
                            </ul>
                        </div>
                        <div className={styles.goldenPlan}>
                            <h3 className={styles.planTitle}>Gold Plan</h3>
                            <ul className={styles.planDetails}>
                                <li>Get access to all the horror shorts for just $10/month.</li>
                                <li>Create up to 3 child accounts or link with 3 existing accounts to share your subscription content</li>
                                <li>Cancel anytime.</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.productCategories}>
                    {/* Films */}
                    <div className={styles.filmHeader}>
                        <h2>Film Collection</h2>
                        <p>Explore our curated selection of films.</p>
                    </div>
                    <div className={styles.films}>
                        <FilmCard/>
                    </div>
                </div>
            </div>
        </div>
    )
}