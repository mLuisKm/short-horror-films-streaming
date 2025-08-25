import styles from "./catalog.module.css"
import FilmList from "@/components/FilmList/FilmList"

export const dynamic = "force-dynamic";

export default async function Catalog() {
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
                    <p>Note: Since this webpage was made with practice purpose, the videos are from youtube and some of them have age restriction on youtube.</p>
                    <div className={styles.films}>
                        <FilmList/>
                    </div>
                </div>
            </div>
        </div>
    )
}