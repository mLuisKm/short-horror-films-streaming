"use client"
import Link from "next/link"
import styles from "./HomeHeader.module.css" 
import { useSession } from "next-auth/react";
import MyAccount from "../MyAccount/MyAccount";

export default function HomeHeader() {
    const { data: session } = useSession();
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>Your Horror Films</h1>
            <nav className={styles.nav}>
                <div>
                    <Link href="/" className={styles.navItem}>Home</Link>
                    <Link href="/catalog" className={styles.navItem}>Catalog</Link>
                    <Link href="/about" className={styles.navItem}>About</Link>
                </div>
                <div className={styles.navRight}>
                    {session ? <MyAccount/> : <Link href="/authenticate" className={styles.navItem}>Sign in</Link>}
                </div>
            </nav>
        </header>
    );
}