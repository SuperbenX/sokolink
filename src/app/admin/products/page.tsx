"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "sonner"
import { Plus, Pencil, Trash2 } from "lucide-react"

interface Product {
  id: string; name: string; description: string; category: string
  price_usd: number; wholesale_price: number | null
  commission_rate: number; status: string
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [sending, setSending] = useState(false)
  const [form, setForm] = useState({
    name: "", description: "", category: "",
    retail_price: "", wholesale_price: "",
  })

  const fetchProducts = () => {
    fetch("/api/admin/products").then(r => r.json()).then(setProducts).catch(() => {})
  }

  useEffect(() => { fetchProducts() }, [])

  const resetForm = () => {
    setForm({ name: "", description: "", category: "", retail_price: "", wholesale_price: "" })
    setEditing(null)
  }

  const openEdit = (p: Product) => {
    setEditing(p)
    setForm({
      name: p.name, description: p.description, category: p.category,
      retail_price: String(p.price_usd),
      wholesale_price: p.wholesale_price ? String(p.wholesale_price) : "",
    })
    setOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      const method = editing ? "PATCH" : "POST"
      const body = editing
        ? {
            id: editing.id,
            fields: {
              name: form.name,
              description: form.description,
              category: form.category,
              price_usd: parseFloat(form.retail_price),
              wholesale_price: form.wholesale_price ? parseFloat(form.wholesale_price) : null,
              commission_rate: 0,
            },
          }
        : {
            name: form.name,
            description: form.description,
            category: form.category,
            price_usd: form.retail_price,
            wholesale_price: form.wholesale_price || null,
            commission_rate: "0",
          }

      const res = await fetch("/api/admin/products", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (res.ok) {
        toast.success(editing ? "Product updated!" : "Product added!")
        setOpen(false)
        resetForm()
        fetchProducts()
      } else {
        const data = await res.json()
        toast.error(data.error || "Error saving product")
      }
    } catch { toast.error("Network error") }
    setSending(false)
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return
    const res = await fetch("/api/admin/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    if (res.ok) {
      toast.success("Product deleted")
      fetchProducts()
    }
  }

  const toggleStatus = async (p: Product) => {
    const newStatus = p.status === "active" ? "inactive" : "active"
    const res = await fetch("/api/admin/products", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: p.id, fields: { status: newStatus } }),
    })
    if (res.ok) {
      toast.success(`${p.name} ${newStatus}`)
      fetchProducts()
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light text-white">Products</h1>
          <p className="mt-1 text-sm text-white/40">{products.length} products in catalog</p>
        </div>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm() }}>
          <DialogTrigger>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#2DD4BF] px-4 py-2 text-sm font-medium text-black hover:bg-[#5EEAD4] cursor-pointer">
              <Plus className="h-4 w-4" /> Add Product
            </span>
          </DialogTrigger>
          <DialogContent className="border-white/10 bg-[#121216] text-white sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-white">{editing ? "Edit Product" : "Add Product"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-sm text-white/60">Product Name *</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required className="mt-1.5 border-white/10 bg-white/5 text-white" />
              </div>
              <div>
                <Label className="text-sm text-white/60">Description *</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required className="mt-1.5 border-white/10 bg-white/5 text-white" rows={3} />
              </div>
              <div>
                <Label className="text-sm text-white/60">Category *</Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v ?? "" })}>
                  <SelectTrigger className="mt-1.5 border-white/10 bg-white/5 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-[#121216] text-white">
                    {["Power & Energy", "Fashion & Apparel", "Electronics", "Home & Living", "Beauty & Health", "Sports & Outdoors"].map((c) => (
                      <SelectItem key={c} value={c} className="focus:bg-white/5">{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-white/60">Wholesale Price (USD) *</Label>
                  <p className="text-[10px] text-white/30 mb-1">What buyers pay you</p>
                  <Input type="number" step="0.01" value={form.wholesale_price}
                    onChange={(e) => setForm({ ...form, wholesale_price: e.target.value })}
                    required className="mt-1.5 border-white/10 bg-white/5 text-white" />
                </div>
                <div>
                  <Label className="text-sm text-white/60">Retail Price (USD)</Label>
                  <p className="text-[10px] text-white/30 mb-1">Suggested selling price</p>
                  <Input type="number" step="0.01" value={form.retail_price}
                    onChange={(e) => setForm({ ...form, retail_price: e.target.value })}
                    className="mt-1.5 border-white/10 bg-white/5 text-white" />
                </div>
              </div>
              <Button type="submit" disabled={sending}
                className="w-full rounded-full bg-[#2DD4BF] text-black hover:bg-[#5EEAD4]">
                {sending ? "Saving..." : editing ? "Update Product" : "Add Product"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-white/5">
        {products.length > 0 ? (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                {["Product", "Category", "Wholesale", "Retail", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left font-medium text-white/40">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="px-5 py-3 text-white/80">{p.name}</td>
                  <td className="px-5 py-3 text-white/40">{p.category}</td>
                  <td className="px-5 py-3 text-[#2DD4BF]">
                    ${(p.wholesale_price || p.price_usd).toFixed(2)}
                  </td>
                  <td className="px-5 py-3 text-white/60">
                    ${Number(p.price_usd).toFixed(2)}
                  </td>
                  <td className="px-5 py-3">
                    <button onClick={() => toggleStatus(p)}
                      className={`rounded-full px-2.5 py-0.5 text-xs border cursor-pointer ${
                        p.status === "active"
                          ? "border-green-500/30 text-green-400"
                          : "border-white/10 text-white/30"
                      }`}>
                      {p.status}
                    </button>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(p)}
                        className="p-1.5 rounded-lg text-white/30 hover:text-white/80 hover:bg-white/5 cursor-pointer">
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={() => handleDelete(p.id, p.name)}
                        className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 cursor-pointer">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-16 text-center">
            <p className="text-sm text-white/30">No products yet. Click &quot;Add Product&quot; to create one.</p>
          </div>
        )}
      </div>
    </div>
  )
}
