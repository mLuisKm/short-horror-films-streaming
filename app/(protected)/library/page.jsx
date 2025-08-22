import styles from './page.module.css'
import LibraryItems from '@/components/LibraryItems/LibraryItems'
export default function Library() {
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