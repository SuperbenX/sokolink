import { NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/service"

export async function POST(req: Request) {
  const body = await req.json()
  const supabase = createServiceClient()

  // Generate a simple temporary password
  const tempPassword = "soko" + Math.random().toString(36).slice(2, 6).toLowerCase()

  const { data: auth, error } = await supabase.auth.admin.createUser({
    email: body.email,
    password: tempPassword,
    email_confirm: true,
    user_metadata: { name: body.name },
  })

  if (error) {
    if (error.message.includes("already been registered") || error.message.includes("already exists")) {
      return NextResponse.json({
        error: "This email is already registered. Please sign in instead.",
        alreadyRegistered: true,
      }, { status: 409 })
    }
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  await supabase.from("profiles").update({
    phone: body.phone || null,
    city: body.city || null,
    follower_count: parseInt(body.followerCount) || null,
  }).eq("id", auth.user.id)

  return NextResponse.json({
    success: true,
    email: body.email,
    password: tempPassword,
    name: body.name,
  })
}
