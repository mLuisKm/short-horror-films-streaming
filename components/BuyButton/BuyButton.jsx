"use client"
import styles from './BuyButton.module.css'
import ConfirmPurchase from '../ConfirmPurchase/ConfirmPurchase'
import { useState } from 'react'
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react'

export default function BuyButton({ product}) {
    const { data: session } = useSession()
    const [isVisible, setVisible] = useState(false)
    const router = useRouter()

    const redirectToLogin = () => {
        if (!session)
        router.push("/authenticate")
        else setVisible(true)
    }

    const handleSubmit = async () => {
        const response = await fetch(`/api/purchase-film`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ filmId: product.productId })
        })

        if (response.ok) {
            alert('Purchase successful!')
            router.push('/catalog')
            setVisible(false)
        } else {
            alert('Purchase failed. Please try again.')
        }
    }
    return (
        <>
            <input type="button" onClick={redirectToLogin} className={styles.button} value={`$ ${product.productPrice}`} />
            <>
                {isVisible && (
                    <div className={styles.confirmPurchase}>
                        <div className={styles.confirm}>
                            <ConfirmPurchase product={product}/>
                            <div className={styles.buttonContainer}>
                                <button className={styles.confirmButton} onClick={handleSubmit}>Confirm</button>
                                <button className={styles.cancelButton} onClick={() => setVisible(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </>
        </>
    )
}