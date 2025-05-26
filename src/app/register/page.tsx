// src/app/register/page.tsx

'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [addressLine, setAddressLine] = useState(""); // บ้านเลขที่ หมู่บ้าน ถนน
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน");
      return;
    }

    const fullAddress = `${addressLine}, เขต/อำเภอ: ${district}, จังหวัด: ${province}, ${postalCode}`;

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        address: fullAddress,
        phone,
        password,
      }),
    });

    if (res.ok) {
      router.push("/login");
    } else {
      const data = await res.json();
      setError(data.message || "เกิดข้อผิดพลาด");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50" style={{paddingTop:'7rem',backgroundColor:'#0e151e'}}>
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-6">สมัครสมาชิก</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="ชื่อ"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="email"
            placeholder="อีเมล"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="บ้านเลขที่ / หมู่บ้าน / ถนน"
            value={addressLine}
            onChange={(e) => setAddressLine(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="เขต/อำเภอ"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="จังหวัด"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="รหัสไปรษณีย์"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <input
            type="tel"
            placeholder="เบอร์โทรศัพท์"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="รหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="ยืนยันรหัสผ่าน"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            สมัครสมาชิก
          </button>
        </form>
      </div>
    </div>
  );
}
