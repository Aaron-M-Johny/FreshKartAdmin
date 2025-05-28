import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const productIds: number[] = await req.json();

  try {
    await Promise.all(
      productIds.map((ProductId) =>
        prisma.grocery.delete({
          where: { ProductId },
        })
      )
    );

    console.log(productIds);

    return NextResponse.json({ status: "success", message: "Deleted!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: "error", message: "Failed to Delete." },
      { status: 500 }
    );
  }
}
