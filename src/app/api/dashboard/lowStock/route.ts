import { NextResponse } from "next/server";

export async function GET() {
  const { prisma } = await import("@/lib/prisma"); // lazy import

  const data = await prisma.grocery.findMany({
    where: {
      Stock: {
        lt: 20,
      },
    },
  });

  return NextResponse.json({ data });
}
