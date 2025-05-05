"use client";

import React from "react";
import styles from "./page.module.css";

import BounceLoader from "react-spinners/SyncLoader";
import { useState, useEffect } from "react";
import LogoPic from "@/components/Img/logo-infinity.png";

const blogPage: React.FC = () => {
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        
      const img = new window.Image(); // ✅ ใช้ window.Image เพื่อหลีกเลี่ยง conflict
      img.src = LogoPic.src;
      img.onload = () => setTimeout(() => setLoading(false), 300);
    }, []);
  
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
addad
          </>
          )}
    </>
  );
};

export default blogPage;