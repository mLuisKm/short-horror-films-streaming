"use client"
import Link from "next/link"
import Image from "next/image"
import styles from "./MyAccount.module.css"
import { useState } from "react"
import { signOut } from "next-auth/react"
import { useEffect } from "react"
export default function MyAccount() {
    const [toggle, setToggle] = useState(styles.accountMenu)
    const [userInfo, setUserInfo] = useState({})
    function handleToggle() {
        if (toggle === styles.accountMenu) {
            setToggle(styles.accountMenuOpen)
        } else {
            setToggle(styles.accountMenu)
        }
    }
    useEffect(() => {
        (async () => {
            const request = await fetch('/api/balance')
            const response = await request.json()
            setUserInfo(response)
        })()
    }, []);
    return (
        <div>
            <button className={styles.accountButton} onClick={handleToggle}>
                <Image className={styles.accountImage}
                    src='/usuario.png'
                    alt=""
                    width={1920}
                    height={1080}/>
            </button>
            <div className={toggle}>
                <h1 className={styles.title}>Welcome:</h1>
                <h2 className={styles.userNickname}>{userInfo.nickname}</h2>
                <h2 className={styles.userBalance}>Balance: ${userInfo.balance}</h2>
                <div className={styles.accountOptions}>
                    <Link href='/profile' onClick={handleToggle} className={styles.link}>Edit Profile</Link>
                    <Link href='/library' onClick={handleToggle} className={styles.link}>Library</Link>
                    <Link href='/sub-manager' onClick={handleToggle} className={styles.link}>Manage Subscription</Link>
                    <button onClick={() => signOut()} className={styles.link}>Sign Out</button>
                    <div className={styles.closeContainer}>
                        <button onClick={handleToggle} className={styles.closeButton}>
                            <Image src='/right-arrow.png' alt="Close" width={1920} height={1080} className={styles.closeImage}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}