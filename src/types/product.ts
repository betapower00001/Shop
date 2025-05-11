export interface Product {
  id: string
  name: string
  price: number
  image?: string
  description?: string
  // เพิ่ม fields ที่ใช้ในระบบคุณ เช่น stock, categoryId ฯลฯ
}
