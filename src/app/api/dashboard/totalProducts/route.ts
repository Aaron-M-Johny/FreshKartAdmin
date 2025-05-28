import { NextResponse } from "next/server";

export async function GET() {
  const { prisma } = await import("@/lib/prisma"); // lazy import here

  const data: number = await prisma.grocery.count();
  return NextResponse.json({ data });
}
