import { prisma } from "@/lib/prisma";
import { getNextProductId } from "@/lib/productIdGenerator";

export async function POST(req: Request) {
  const formData = await req.json();

  if (
    !formData.ProductName ||
    !formData.Brand ||
    isNaN(parseFloat(formData.Price)) ||
    isNaN(parseFloat(formData.DiscountPrice)) ||
    isNaN(parseInt(formData.Stock, 10)) ||
    !formData.Quantity ||
    !formData.Image_Url?.startsWith("http")
  ) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Missing or invalid product fields.",
      }),
      { status: 400 }
    );
  }

  try {
    const nextProductId = await getNextProductId();

    const created = await prisma.grocery.create({
      data: {
        ...formData,
        ProductId: nextProductId,
        Stock: parseInt(formData.Stock, 10),
        Price: parseFloat(formData.Price),
        DiscountPrice: parseFloat(formData.DiscountPrice),
      },
    });

    if (!created) {
      throw new Error("Failed to create product.");
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Product added successfully!",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding product:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "An error occurred while adding the product.",
      }),
      { status: 500 }
    );
  }
}

