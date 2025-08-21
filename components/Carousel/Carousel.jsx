"use client"
import styles from './Carousel.module.css'
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import React from 'react';

export default function Carousel({ portraits }) {
    const [emblaRef] = useEmblaCarousel({ loop: true, duration: 25 }, [Autoplay()])
    return (
        <div className={styles.embla} ref={emblaRef}>
            <div className={styles.emblaContainer}>
                {portraits.map((portrait, index)=>(
                    <React.Fragment key={index}>
                        <Image
                            className={styles.emblaSlide}
                            src={portrait[0]}
                            alt=""
                            width={1920}
                            height={1800}
                            priority
                        />
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}