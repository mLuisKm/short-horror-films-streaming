"use client"
import styles from './LibraryItems.module.css'
import Image from "next/image"
import React, { useState, useEffect } from "react"
import Link from "next/link"

export const dynamic = 'force-dynamic';

export default function LibraryItems() {
    const [films, setFilms] = useState([])
    const [pagination, setPagination] = useState({
        text: 'View more...',
        value: 6
    })
    function paginate() {
        if (films.length < 6) {
            return;
        }
        if (pagination.value == 6) {
            setPagination({
                text: 'View less',
                value: films.length
            })
        } else {
            setPagination({
                text: 'View more...',
                value: 6
            })
        }
    }
    useEffect(() => {
        (async () => {
            const request = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/library`)
            const result = await request.json()
            setFilms(result)
        })()
    }, [])
    return (
        <div>
            <div className={styles.filmOptions}>
                {/* Film options will go here */}
                {films.slice(0,pagination.value).map((filmInfo, index) => (
                    <React.Fragment key={index}>
                            <Link href={`/watch/${filmInfo.film_id}`} className={styles.filmCard}>
                                <Image
                                    className={styles.filmPortrait}
                                    src={filmInfo.film_portrait}
                                    alt=""
                                    width={1920}
                                    height={1080}
                                    priority
                                ></Image>
                                <p className={styles.title}>{filmInfo.film_name}</p>
                            </Link>
                    </React.Fragment>
                ))}
            </div>
            {films.length >= 6 && <div className={styles.pageController}>
                <input type="button" value={pagination.text} onClick={paginate} className={styles.pagination}/>
            </div>}
        </div>
    )
}