import Link from "next/link"
import styles from "./HomeHeader.module.css" 

export default function HomeHeader() {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>Your Horror Films</h1>
            <nav className={styles.nav}>
                <Link href="/" className={styles.navItem}>Home</Link>
                <Link href="/" className={styles.navItem}>Catalog</Link>
                <Link href="/about" className={styles.navItem}>About</Link>
                <Link href="/authenticate" className={styles.navItem}>Sign in</Link>
            </nav>
        </header>
    );
}