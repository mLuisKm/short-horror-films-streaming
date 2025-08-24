import { headers } from "next/headers"
import styles from './page.module.css'
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../utils/auth";
import { redirect } from "next/navigation";
export default async function WatchPage({ params }) {
    const session = await getServerSession(authOptions);
    if (!session) { redirect('/authenticate'); }
    const headersList = await headers();
    const cookie = headersList.get('cookie');
    const data = await params;
    const req = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/film/${data.id}`, {
            method: 'GET',
            headers : {
                'Content-Type': 'application/json',
                Cookie: cookie ?? ""
                }
            })
    const res = await req.json()
    console.log('Film data:', res)
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.videoContainer}>
                    <iframe
                    src={res.film_url}
                    title={res.film_name}
                    className={styles.video}
                    allowFullScreen
                />
                </div>
                <div className={styles.info}>
                    <h2 className={styles.title}>{res.film_name}</h2>
                    <p className={styles.author}>By: {res.film_author}</p>
                    <p className={styles.synopsis}>Synopsis:</p>
                    <p>{res.film_synopsis}</p>
                </div>
            </div>
        </div>
    )
}