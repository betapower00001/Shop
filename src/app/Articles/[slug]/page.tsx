// app/articles/[slug]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import HeaderNavbar from "@/components/Menu/indexnavbar";
import Footer from "@/components/Footer";
import Newletter from "@/components/Newsletter";
import { Container } from "react-bootstrap";
import Image from "next/image";

// ตัวอย่าง mock data
const mockArticles = [
    {
        slug: "tiktok-viral-2025",
        title: "เปิด TikTok ยังไงให้ไวรัล ปี 2025",
        content: `เนื้อหาจริงเต็ม ๆ สำหรับ TikTok ปี 2025...\n\n1. เริ่มจากการรู้จักกลุ่มเป้าหมายของคุณ\n2. ใช้เสียงและ trend ที่กำลังมาแรง\n3. อย่าลืม Call to Action ที่ชัดเจน`,
        imageUrl: "/Img/contant-2.jpg",
    },
    {
        slug: "ux-design-tips",
        title: "ออกแบบ UX อย่างไรให้ลูกค้ารัก",
        content: `UX คือหัวใจของการสร้างประสบการณ์ที่ดี\n\n1. ต้องมีความง่ายในการใช้งาน\n2. ต้องเข้าถึงผู้ใช้ และตอบโจทย์เป้าหมาย\n3. ทดสอบก่อนปล่อยจริงเสมอ`,
        imageUrl: "/Img/contant-2.jpg",
    },
];

const ArticleDetailPage = () => {
    const params = useParams();
    const { slug } = params;

    const article = mockArticles.find((a) => a.slug === slug);

    if (!article) return notFound();

    return (
        <>
            <HeaderNavbar />
            <Container className="py-5">
                <h1>{article.title}</h1>
                <Image
                    src={article.imageUrl}
                    alt={article.title}
                    width={800}
                    height={400}
                    style={{ borderRadius: "12px", marginBottom: "1.5rem" }}
                />
                <div style={{ whiteSpace: "pre-wrap", fontSize: "1.1rem", lineHeight: "1.8" }}>
                    {article.content}
                </div>
            </Container>
            <Newletter />
            <Footer />
        </>
    );
};

export default ArticleDetailPage;
