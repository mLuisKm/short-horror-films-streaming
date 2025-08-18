"use client"
import styles from './Carousel.module.css'
import React, { useEffect } from 'react';
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from 'embla-carousel-autoplay';

export default function Carousel() {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()])

    // useEffect(() => {
    //     if (emblaApi) {
    //         console.log(emblaApi.slideNodes()) // Access API
    //     }
    // }, [emblaApi])

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