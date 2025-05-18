// src/app/checkout/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useSession } from "next-auth/react";

export default function CheckoutPage() {
  const { items, totalPrice, setItems } = useCartStore();
  const router = useRouter();
  const { data: session, status } = useSession();

  const userId = session?.user?.id;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const validateCartItems = async () => {
      const validItems = [];

      for (const item of items) {
        const res = await fetch(`/api/products/${item.productId}`);
        if (res.ok) {
          validItems.push(item);
        }
      }

      if (validItems.length !== items.length) {
        setItems(validItems);
      }
    };

    validateCartItems();
  }, [items, setItems]);

  useEffect(() => {
    if (!userId) return;

    async function fetchUser() {
      try {
        const res = await fetch(`/api/user/${userId}`);
        if (!res.ok) throw new Error(await res.text());
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
    if (!userId || !name || !address || !phone || items.length === 0) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const confirm = window.confirm("ยืนยันการสั่งซื้อใช่หรือไม่?");
    if (!confirm) return;

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
            productId: item.productId,
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
      }
    } catch (error: any) {
      alert("เกิดข้อผิดพลาด: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderPaymentInfo = () => {
    switch (paymentMethod) {
      case "bank_transfer":
        return <p className="text-sm text-gray-600 mt-1">💸 โอนเงินผ่านบัญชีธนาคาร และอัปโหลดสลิป</p>;
      case "credit_card":
        return <p className="text-sm text-gray-600 mt-1">💳 ชำระเงินด้วยบัตรเครดิตผ่านระบบจำลอง</p>;
      case "cod":
        return <p className="text-sm text-gray-600 mt-1">📦 ชำระเงินกับพนักงานจัดส่ง (COD)</p>;
    }
  };

  if (status === "loading") return <p className="text-center mt-10">กำลังโหลดข้อมูลผู้ใช้...</p>;
  if (!session) return <p className="text-center mt-10">กรุณาเข้าสู่ระบบก่อนทำรายการ</p>;

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">สรุปคำสั่งซื้อ</h1>

      <ul className="mb-4">
        {items.length === 0 && <p>ไม่มีสินค้าในตะกร้า</p>}
        {items.map((item) => (
          <li key={item.id} className="py-2 border-b">
            <div className="flex justify-between">
              <span>{item.name} (x{item.quantity})</span>
              <span>฿{item.price.toFixed(2)}</span>
            </div>
            <div className="text-right text-sm text-gray-500">
              รวม: ฿{(item.price * item.quantity).toFixed(2)}
            </div>
          </li>
        ))}
      </ul>

      <div className="font-bold mb-4">ยอดรวม: ฿{totalPrice.toFixed(2)}</div>

      <div className="mb-4 space-y-3">
        <div>
          <label className="block mb-1 font-medium">ชื่อผู้รับ:</label>
          <input
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
            rows={2}
            placeholder="ที่อยู่"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">เบอร์โทร:</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border px-2 py-1"
            placeholder="เบอร์โทร"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">อีเมล:</label>
          <input
            value={session?.user?.email ?? ""}
            readOnly
            className="w-full border px-2 py-1 bg-gray-100 text-gray-500"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">วิธีการชำระเงิน:</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full border px-2 py-1"
        >
          <option value="bank_transfer">💸 โอนเงินผ่านธนาคาร</option>
          <option value="credit_card">💳 บัตรเครดิต</option>
          <option value="cod">📦 เก็บเงินปลายทาง</option>
        </select>
        {renderPaymentInfo()}
      </div>

      <button
        onClick={handleCheckout}
        disabled={isLoading || items.length === 0}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full disabled:opacity-50"
      >
        {isLoading ? "กำลังดำเนินการ..." : "ยืนยันคำสั่งซื้อ"}
      </button>
    </div>
  );
}
