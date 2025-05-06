'use client';
import React from 'react';
import Image from 'next/image';
import styles from './ServiceGrid.module.css';
import Icondong1 from '../Img/Icon-dong-1.png'
import Icondong2 from '../Img/Icon-dong-2.png'
import Icondong3 from '../Img/Icon-dong-3.png'
import Icondong4 from '../Img/Icon-dong-4.png'

const services = [
    {
        title: 'ดูดวงออนไลน์',
        subtitle: 'Live/รอโชคชะตา',
        icon: Icondong1.src,
    },
    {
        title: 'จัดทัวร์ไหว้พระ',
        subtitle: 'มู-ต่างประเทศ',
        icon : Icondong2.src,
    },
    {
        title: 'ทำบุญออนไลน์',
        subtitle: 'Content สายมู',
        icon: Icondong3.src,
    },
    {
        title: 'เลขเด็ด เลขมงคล',
        subtitle: 'ดวงจุ้ย / มูรีพอร์ตการตลาด',
        icon: Icondong4.src,
    },
];

export default function ServiceGrid() {
    return (
        <div className={`${styles.bgMu} py-5`}>
            <div className="container py-5">
                <h1 className={styles.muHeading}>เราสร้างสรรค์บนทุกแพลตฟอร์ม</h1>
                <div className={styles.detailHeading}>เป็นผู้นำด้านการตลาดสายมู MUTECH แนวใหม่ อย่างแท้จริง</div>
                <div className="row g-4">
                    {services.map((service, index) => (
                        <div key={index} className="col-md-6">
                            <div className={styles.muCard}>
                                <Image
                                    src={service.icon}
                                    alt={service.title}
                                    width={100}
                                    height={100}     
                                    className={styles.muIcon}
                                />
                                <div>
                                    <h5 className="mb-1 text-light">{service.title}</h5>
                                    <p className={styles.muSubtext}>{service.subtitle}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
