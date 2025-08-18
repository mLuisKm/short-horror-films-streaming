import styles from './layout.module.css';
import HomeHeader from "@/components/HomeHeader/HomeHeader"
export default function AuthLayout({ children }) {
    return (
        <div className={styles.layoutContainer}>
            <HomeHeader />
            <div className={styles.layoutContent}>
                {children}
            </div>
        </div>
    )
}