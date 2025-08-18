import styles from './Carousel.module.css'
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from 'embla-carousel-autoplay';

export default function Carousel() {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()])
    return (
        <div className={styles.embla} ref={emblaRef}>
            <div className={styles.emblaContainer}>
            <div className={styles.emblaSlide1}></div>
            <div className={styles.emblaSlide2}></div>
            <div className={styles.emblaSlide3}></div>
            </div>
        </div>
    )
}