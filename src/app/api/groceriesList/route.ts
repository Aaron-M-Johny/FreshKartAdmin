import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const subCategory = url.searchParams.get("subcategory");

  console.log("Subcategory:", subCategory);

  if (!subCategory) {
    return NextResponse.json(
      { status: "error", message: "Missing subcategory param" },
      { status: 400 }
    );
  }

  const groceries = await prisma.grocery.findMany({
    where: {
      SubCategory: subCategory,
    },
    select: {
      Image_Url: true,
      ProductId: true,
      Brand: true,
      ProductName: true,
      Stock: true,
      Price: true,
      DiscountPrice: true,
      Quantity: true,
    },
  });
  return NextResponse.json({ status: "ok", data: groceries });
}
