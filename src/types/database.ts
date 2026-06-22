export type UserRole = "influencer" | "admin"

export type UserStatus = "pending" | "active" | "suspended"

export interface Profile {
  id: string
  email: string
  name: string
  role: UserRole
  phone?: string
  city?: string
  instagram_handle?: string
  tiktok_handle?: string
  facebook_handle?: string
  follower_count?: number
  status: UserStatus
  created_at: string
}

export interface Product {
  id: string
  name: string
  description: string
  category: string
  price_usd: number
  wholesale_price: number | null
  commission_rate: number
  images: string[]
  stock: number
  status: "active" | "inactive"
  created_at: string
}

export interface Order {
  id: string
  influencer_id: string
  product_id: string
  quantity: number
  total_amount: number
  status: "new" | "paid" | "shipped" | "delivered" | "cancelled"
  customer_name: string
  customer_phone?: string
  delivery_address?: string
  created_at: string
}

export interface Commission {
  id: string
  order_id: string
  influencer_id: string
  amount: number
  status: "pending" | "paid"
  paid_at?: string
  created_at: string
}

export interface SampleRequest {
  id: string
  influencer_id: string
  product_id: string
  status: "pending" | "approved" | "shipped" | "rejected"
  shipping_address?: string
  notes?: string
  created_at: string
}
