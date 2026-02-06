import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category");
  const country = searchParams.get("country");
  const type = searchParams.get("type");
  const search = searchParams.get("search");

  let query = supabaseAdmin
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false });

  if (category) query = query.eq("category", category);
  if (country) query = query.eq("country", country);
  if (type) query = query.eq("type", type);
  if (search) query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { title, description, category, type, country, city, pay, posted_by, phone, urgent } = body;

  if (!title || !description || !category || !type || !country || !city || !pay || !posted_by || !phone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("jobs")
    .insert({
      title,
      description,
      category,
      type,
      country,
      city,
      pay,
      posted_by,
      phone,
      urgent: urgent || false,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
