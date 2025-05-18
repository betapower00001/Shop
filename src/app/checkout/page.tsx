// src/app/checkout/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useSession } from "next-auth/react";

export default function CheckoutPage() {
  const { items, totalPrice } = useCartStore();
  const router = useRouter();
  const { data: session, status } = useSession();

  const userId = session?.user?.id;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // ดึงข้อมูลผู้ใช้เมื่อมี userId
  useEffect(() => {
    if (!userId) return;

    async function fetchUser() {
      try {
        const res = await fetch(`/api/user/${userId}`);
        if (!res.ok) {
          const errText = await res.text();
          throw new Error(errText);
        }
        const user = await res.json();
        setName(user.name || "");
        setAddress(user.address || "");
        setPhone(user.phone || "");
      } catch (error: any) {
        console.error("Fetch user error:", error);
        setError("เกิดข้อผิดพลาดในการโหลดข้อมูลผู้ใช้");
      }
    }

    fetchUser();
  }, [userId]);

  const handleCheckout = async () => {
    if (!userId) {
      alert("ไม่พบรหัสผู้ใช้ กรุณาเข้าสู่ระบบใหม่");
      return;
    }

    if (!name.trim() || !address.trim() || !phone.trim()) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    if (items.length === 0) {
      alert("ไม่มีสินค้าในตะกร้า");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          shippingName: name,
          shippingAddress: address,
          shippingPhone: phone,
          totalAmount: totalPrice,
          paymentMethod,
          orderItems: items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            totalAmount: item.price * item.quantity,
          })),
        }),
      });

      if (!res.ok) throw new Error(await res.text());

      const { orderId } = await res.json();

      switch (paymentMethod) {
        case "bank_transfer":
          router.push(`/payments/upload-slip?orderId=${orderId}`);
          break;
        case "credit_card":
          router.push(`/payments/credit-card?orderId=${orderId}`);
          break;
        case "cod":
          alert("ยืนยันคำสั่งซื้อสำเร็จ! รอเจ้าหน้าที่ติดต่อกลับ");
          router.push("/order-success");
          break;
        default:
          alert("วิธีการชำระเงินไม่ถูกต้อง");
      }
    } catch (error: any) {
      alert("เกิดข้อผิดพลาด: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return <p className="text-center mt-10">กำลังโหลดข้อมูลผู้ใช้...</p>;
  }

  if (!session) {
    return <p className="text-center mt-10">กรุณาเข้าสู่ระบบก่อนทำรายการ</p>;
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">สรุปคำสั่งซื้อ</h1>

      <ul className="mb-4">
        {items.length === 0 && <p>ไม่มีสินค้าในตะกร้า</p>}
        {items.map((item) => (
          <li key={item.id} className="flex justify-between py-1">
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>{(item.price * item.quantity).toFixed(2)} บาท</span>
          </li>
        ))}
      </ul>

      <div className="font-bold mb-4">ยอดรวม: {totalPrice.toFixed(2)} บาท</div>

      <div className="mb-4 space-y-2">
        <div>
          <label className="block mb-1 font-medium">ชื่อผู้รับ:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-2 py-1"
            placeholder="ชื่อผู้รับ"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">ที่อยู่จัดส่ง:</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border px-2 py-1"
            rows={3}
            placeholder="ที่อยู่จัดส่ง"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">เบอร์โทรศัพท์:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border px-2 py-1"
            placeholder="เบอร์โทรศัพท์"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">อีเมล:</label>
          <input
            type="email"
            value={session?.user?.email ?? ""}
            readOnly
            className="w-full border px-2 py-1 bg-gray-100 text-gray-500"
          />
        </div>
      </div>

      <div className="mb-4">
        <label>วิธีการชำระเงิน:</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full border px-2 py-1"
        >
          <option value="bank_transfer">โอนเงิน</option>
          <option value="credit_card">บัตรเครดิต</option>
          <option value="cod">เก็บเงินปลายทาง</option>
        </select>
      </div>

      <button
        onClick={handleCheckout}
        disabled={isLoading || items.length === 0}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isLoading ? "กำลังดำเนินการ..." : "ยืนยันคำสั่งซื้อ"}
      </button>
    </div>
  );
}
