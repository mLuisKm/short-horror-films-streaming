import { headers } from "next/headers"
export default async function WatchPage({ params }) {
    const headersList = await headers();
    const cookie = headersList.get('cookie');
    const data = await params;
    const req = await fetch(`${process.env.NEXT_BASE_URL}/api/film/${data.id}`, {
            method: 'GET',
            headers : {
                'Content-Type': 'application/json',
                Cookie: cookie ?? ""
                }
            })
    const res = await req.json()
    console.log('Film data:', res)
    return (
        <div>
            <h1>Watch Page - Film ID: {data.id}</h1>
            {/* Add your watch page content here */}
            <iframe
                src={res.film_url}
                title={res.film_name}
                width="100%"
                height="500px"
                allowFullScreen
            ></iframe>
            <h2>{res.filmName}</h2>
            <p>Author: {res.filmAuthor}</p>
            <p>Synopsis: {res.filmSynopsis}</p>
        </div>
    )
}