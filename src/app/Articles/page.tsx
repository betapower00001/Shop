"use client"

import React, { useState, useEffect } from "react"
import { Container } from "react-bootstrap";
import styles from "./page.module.css";
import HeaderNavbar from "@/components/Menu/indexnavbar";
import Footer from "@/components/Footer";
import Newletter from "@/components/Newsletter";

import BounceLoader from "react-spinners/SyncLoader"
import Image from "next/image"
import Link from "next/link"
import LogoPic from "@/components/Img/logo-infinity.png"

const BlogPage: React.FC = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const img = new window.Image(); // ✅ ใช้ window.Image เพื่อหลีกเลี่ยง conflict
        img.src = LogoPic.src;
        img.onload = () => setTimeout(() => setLoading(false), 300);
    }, []);

    const mockArticles = [
        {
            id: 1,
            title: "เปิด TikTok ยังไงให้ไวรัล ปี 2025",
            summary: "เรียนรู้เทคนิค TikTok ยังไงให้ไวรัล ปี 2025...",
            imageUrl: "/Img/contant-2.jpg",
            slug: "tiktok-viral-2025",
        },
        {
            id: 2,
            title: "ออกแบบ UX อย่างไรให้ลูกค้ารัก",
            summary: "UX ที่ดีไม่ใช่แค่สวย แต่ต้องใช้งานง่ายและเข้าถึงใจลูกค้า...",
            imageUrl: "/Img/contant-2.jpg",
            slug: "ux-design-tips",
        },
    ]

    return (
        <>
            {loading && (
                <div className="loading-overlay">
                    <img src={LogoPic.src} width="200" alt="Loading Logo" />
                    <BounceLoader color="white" loading={loading} size={12.5} />
                </div>
            )}
            {!loading && (
                <>
                    <HeaderNavbar />
                    <Container className="py-5">
                        <div className={styles.container}>
                            <h1 className={styles.heading}>📝 บทความล่าสุด</h1>
                            <p className={styles.subheading}>
                                รวมเนื้อหาอัปเดตใหม่ ที่จะช่วยให้คุณเก่งขึ้นทุกวัน
                            </p>
                            <div className={styles.grid}>
                                {mockArticles.map((article) => (
                                    <div key={article.id} className={styles.card}>
                                        <Image
                                            src={article.imageUrl}
                                            alt={article.title}
                                            width={400}
                                            height={220}
                                            className={styles.image}
                                        />
                                        <div className={styles.cardContent}>
                                            <h2>{article.title}</h2>
                                            <p>{article.summary}</p>
                                            <Link href={`/Articles/${article.slug}`} className={styles.readMore}>
                                                อ่านต่อ →
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Container>
                    <Newletter />
                    <Footer />
                </>
            )}
        </>
    )
}

export default BlogPage
