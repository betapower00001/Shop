export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      cartItem: {
        Row: {
          id: number;
          userId: number;
          productId: number;
          quantity: number;
        };
        Insert: {
          id?: number;
          userId: number;
          productId: number;
          quantity: number;
        };
        Update: {
          id?: number;
          userId?: number;
          productId?: number;
          quantity?: number;
        };
      };

      product: {
        Row: {
          id: number;
          name: string;
          description: string | null;
          price: number;
          stock: number;
          imageUrl: string | null;
          isActive: boolean;
          createdAt: string;
          updatedAt: string;
        };
        Insert: {
          id?: number;
          name: string;
          description?: string | null;
          price: number;
          stock?: number;
          imageUrl?: string | null;
          isActive?: boolean;
          createdAt?: string;
          updatedAt?: string;
        };
        Update: {
          id?: number;
          name?: string;
          description?: string | null;
          price?: number;
          stock?: number;
          imageUrl?: string | null;
          isActive?: boolean;
          createdAt?: string;
          updatedAt?: string;
        };
      };

      user: {
        Row: {
          id: number;
          email: string;
          name: string | null;
          password: string;
          address: string | null;
          phone: string | null;
          createdAt: string;
          role: string;
        };
        Insert: {
          id?: number;
          email: string;
          name?: string | null;
          password: string;
          address?: string | null;
          phone?: string | null;
          createdAt?: string;
          role?: string;
        };
        Update: {
          id?: number;
          email?: string;
          name?: string | null;
          password?: string;
          address?: string | null;
          phone?: string | null;
          createdAt?: string;
          role?: string;
        };
      };

      order: {
        Row: {
          id: number;
          userId: number;
          totalAmount: number;
          status: string;
          createdAt: string;
          shippingAddress: string | null;
          trackingNumber: string | null;
          shippingName: string | null;
          shippingPhone: string | null;
        };
        Insert: {
          id?: number;
          userId: number;
          totalAmount: number;
          status?: string;
          createdAt?: string;
          shippingAddress?: string | null;
          trackingNumber?: string | null;
          shippingName?: string | null;
          shippingPhone?: string | null;
        };
        Update: {
          id?: number;
          userId?: number;
          totalAmount?: number;
          status?: string;
          createdAt?: string;
          shippingAddress?: string | null;
          trackingNumber?: string | null;
          shippingName?: string | null;
          shippingPhone?: string | null;
        };
      };

      orderItem: {
        Row: {
          id: number;
          orderId: number;
          productId: number;
          quantity: number;
          totalAmount: number;
        };
        Insert: {
          id?: number;
          orderId: number;
          productId: number;
          quantity: number;
          totalAmount: number;
        };
        Update: {
          id?: number;
          orderId?: number;
          productId?: number;
          quantity?: number;
          totalAmount?: number;
        };
      };

      payment: {
        Row: {
          id: number;
          orderId: number;
          amount: number;
          status: string;
          paidAt: string;
          userId: number;
          paymentMethod: string;
          proofImageUrl: string | null;
        };
        Insert: {
          id?: number;
          orderId: number;
          amount: number;
          status: string;
          paidAt?: string;
          userId: number;
          paymentMethod: string;
          proofImageUrl?: string | null;
        };
        Update: {
          id?: number;
          orderId?: number;
          amount?: number;
          status?: string;
          paidAt?: string;
          userId?: number;
          paymentMethod?: string;
          proofImageUrl?: string | null;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}
