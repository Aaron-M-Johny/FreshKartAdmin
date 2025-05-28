import { productStockListInterface } from "@/interfaces/admin/interfaces";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prisma } = await import("@/lib/prisma"); // lazy import inside handler
  const data: productStockListInterface[] = await req.json();

  try {
    await Promise.all(
      data.map((item) =>
        prisma.grocery.update({
          where: {
            ProductId: item.ProductId,
          },
          data: {
            Stock: item.Stock,
          },
        })
      )
    );

    return NextResponse.json({ status: "success", message: "Stock updated!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: "error", message: "Failed to update stock." },
      { status: 500 }
    );
  }
}
