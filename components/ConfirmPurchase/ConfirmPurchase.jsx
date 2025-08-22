import styles from './ConfirmPurchase.module.css'

export default function ConfirmPurchase({ product }) {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Confirm Purchase</h2>
            <div className={styles.productDetails}>
                <div className={styles.labelContainer}>
                    <strong>Product Name: </strong>
                    <p className={styles.name}>{product.productName}</p>
                </div>
                <div className={styles.labelContainer}>
                    <strong>Author: </strong>
                    <p className={styles.label}>{product.productAuthor}</p>
                </div>
                <div className={styles.labelContainer}>
                    <strong>Duration: </strong>
                    <p className={styles.label}>{product.productDuration} min</p>
                </div>
                <div className={styles.labelContainer}>
                    <strong>Price: </strong>
                    <p className={styles.price}> ${product.productPrice}</p>
                </div>
            </div>
        </div>
    )
}