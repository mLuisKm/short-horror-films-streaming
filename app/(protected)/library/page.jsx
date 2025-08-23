import styles from './page.module.css'
import LibraryItems from '@/components/LibraryItems/LibraryItems'
import { getServerSession } from "next-auth";
import { authOptions } from "../../../utils/auth";
import { redirect } from "next/navigation";
export default async function Library() {
    const session = await getServerSession(authOptions);
    if (!session) { redirect('/authenticate'); }
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.libraryHeader}>
                    <h1>Your Short Films Library</h1>
                </div>
                <div>
                    <LibraryItems />
                </div>
            </div>
        </div>
    )
}