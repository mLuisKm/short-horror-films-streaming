"use client"
import Link from "next/link"
import Image from "next/image"
import styles from "./MyAccount.module.css"
import { useState } from "react"
import SignOutButton from "../SignOutButton/SignOutButton"
export default function MyAccount() {
    const [toggle, setToggle] = useState(styles.accountMenu)
    function handleToggle() {
        if (toggle === styles.accountMenu) {
            setToggle(styles.accountMenuOpen)
        } else {
            setToggle(styles.accountMenu)
        }
    }
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
                <p><strong>Menú</strong></p>
                <p>Edit Profile</p>
                <p>Library</p>
                <p>Manage Subscription</p>
                <SignOutButton />
                <div>
                    <button onClick={handleToggle}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}