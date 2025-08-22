import styles from "./page.module.css"
import Image from "next/image"
import BuyButton from "@/components/BuyButton/BuyButton"
export default async function FilmDetails({ params }) {
    const film = await params
    const request = await fetch(`${process.env.NEXT_BASE_URL}/api/film-details/${film.id}`)
    const result = await request.json()
    const product = {
        productId: result.film_id,
        productName: result.film_name,
        productAuthor: result.film_author,
        productDuration: result.film_duration,
        productPrice: result.film_price
    }
    console.log(result)
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.card}>
                    <div className={styles.itemPortrait}>
                        <Image
                            className={styles.image}
                            src={result.film_portrait}
                            alt=""
                            width={1920}
                            height={1080}
                            priority
                        />
                        <p className={styles.title}>Title: {result.film_name}</p>
                        <p className={styles.label}>By: {result.film_author}</p>
                        <p className={styles.label}>Duration: {result.film_duration} min</p>
                        <div className={styles.filmPrice}>
                            <BuyButton product={product}/>
                        </div>
                    </div>
                    <div className={styles.itemDetails}>
                        <p className={styles.synopsis}>Synopsis: {result.film_synopsis}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}