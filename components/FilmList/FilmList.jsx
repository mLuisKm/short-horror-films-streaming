"use client"
import styles from './FilmList.module.css'
import Image from "next/image"
import React, { useState, useEffect } from "react"
import Link from "next/link"

export default function FilmList() {
    const [films, setFilms] = useState([])
    const [pagination, setPagination] = useState({
        text: 'View more...',
        value: 6
    })
    useEffect(() => {
        (async () => {
            const request = await fetch('http://localhost:3000/api/films')
            const result = await request.json()
            setFilms(result)
        })()
    }, [])

    function paginate() {
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

    return (
        <div>
            <div className={styles.filmOptions}>
                {/* Film options will go here */}
                {films.slice(0,pagination.value).map((filmInfo, index) => (
                    <React.Fragment key={index}>
                        <Link href={`/catalog/film-details/${filmInfo.film_id}`} className={styles.filmCard}>
                            <Image
                                className={styles.filmPortrait}
                                src={filmInfo.film_portrait}
                                alt=""
                                width={1920}
                                height={1080}
                                priority
                            ></Image>
                            <div className={styles.filmData}>
                                <div className={styles.filmTitle}>
                                    <p>{filmInfo.film_name}</p>
                                    <p className={styles.duration}>{filmInfo.film_duration}</p>
                                </div>
                                <p className={styles.label}>By {filmInfo.film_author}</p>
                                <div className={styles.filmPrice}>
                                    <p className={styles.label}>${filmInfo.film_price}</p>
                                </div>
                            </div>
                        </Link>
                    </React.Fragment>
                ))}
            </div>
            <div className={styles.pageController}>
                <input type="button" value={pagination.text} onClick={paginate} className={styles.pagination}/>
            </div>
        </div>
    )
}