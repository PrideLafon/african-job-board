import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data, error } = await supabaseAdmin
    .from("jobs")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  // Fetch related jobs
  const { data: related } = await supabaseAdmin
    .from("jobs")
    .select("*")
    .eq("category", data.category)
    .neq("id", id)
    .order("created_at", { ascending: false })
    .limit(3);

  return NextResponse.json({ job: data, related: related || [] });
}
