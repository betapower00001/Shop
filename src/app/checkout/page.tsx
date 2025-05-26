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
        if (res.ok) validItems.push(item);
      }
      if (validItems.length !== items.length) setItems(validItems);
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
      } catch (error: unknown) {
        setError("เกิดข้อผิดพลาดในการโหลดข้อมูลผู้ใช้");
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("Unexpected error:", error);
        }
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert("เกิดข้อผิดพลาด: " + error.message);
      } else {
        alert("เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const renderPaymentInfo = () => {
    switch (paymentMethod) {
      case "bank_transfer":
        return <p className="text-sm text-gray-600"> โอนเงินผ่านบัญชีธนาคาร และอัปโหลดสลิป</p>;
      case "credit_card":
        return <p className="text-sm text-gray-600"> ชำระเงินด้วยบัตรเครดิต</p>;
      case "cod":
        return <p className="text-sm text-gray-600"> ชำระเงินปลายทาง</p>;
      default:
        return null;
    }
  };

  if (status === "loading") return <p className="text-center mt-10" style={{ paddingTop: '4rem' }}>กำลังโหลดข้อมูลผู้ใช้...</p>;
  if (!session) return <p className="text-center mt-10" style={{ paddingTop: '4rem' }}>กรุณาเข้าสู่ระบบก่อนทำรายการ</p>;

  return (
    <div style={{backgroundColor:'gray'}}>
      <div className="max-w-6xl mx-auto mt-20 p-6">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">ชำระเงิน / Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ฝั่งซ้าย: ข้อมูลผู้ซื้อ */}
          <div className="bg-white p-6 rounded-xl shadow-md border">
            <h2 className="text-xl font-semibold mb-4 text-blue-700"> ข้อมูลผู้ซื้อ</h2>

            <div className="space-y-4">
              <div>
                <label className="block font-medium">ชื่อผู้รับ</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-medium">ที่อยู่จัดส่ง</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  className="w-full border rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-medium">เบอร์โทร</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-medium">อีเมล</label>
                <input
                  value={session?.user?.email ?? ""}
                  readOnly
                  className="w-full border rounded-md px-3 py-2 bg-gray-100 text-gray-500"
                />
              </div>
            </div>
          </div>

          {/* ฝั่งขวา: รายการสั่งซื้อ & การชำระเงิน */}
          <div className="bg-white p-6 rounded-xl shadow-md border">
            <h2 className="text-xl font-semibold mb-4 text-green-600"> รายการสั่งซื้อของคุณ</h2>

            <ul className="divide-y divide-gray-200 mb-4">
              {items.length === 0 ? (
                <p className="text-center text-gray-500">ไม่มีสินค้าในตะกร้า</p>
              ) : (
                items.map((item) => (
                  <li key={item.id} className="py-2 flex justify-between text-gray-800">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>฿{(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))
              )}
            </ul>

            <div className="text-right font-bold text-lg text-gray-800 mb-6">
              ยอดรวม: ฿{totalPrice.toFixed(2)}
            </div>

            <div className="mb-4">
              <label className="block font-medium text-gray-700"> วิธีชำระเงิน</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="bank_transfer"> โอนเงินผ่านธนาคาร</option>
                <option value="credit_card"> บัตรเครดิต</option>
                <option value="cod"> เก็บเงินปลายทาง</option>
              </select>
              <div className="mt-2">{renderPaymentInfo()}</div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isLoading || items.length === 0}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white font-semibold py-3 rounded-md transition disabled:cursor-not-allowed"
            >
              {isLoading ? "กำลังดำเนินการ..." : "ยืนยันคำสั่งซื้อ"}
            </button>

            {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
