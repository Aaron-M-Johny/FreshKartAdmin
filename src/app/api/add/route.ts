import { prisma } from "@/lib/prisma";
import { getNextProductId } from "@/lib/productIdGenerator"; // adjust the path if needed

export async function POST(req: Request) {
  const formData = await req.json();

  try {
    // Generate next product ID
    const nextProductId = await getNextProductId();

    // Insert product with the generated ProductId
    await prisma.grocery.create({
      data: {
        ...formData,
        ProductId: nextProductId,
        Stock: parseInt(formData.Stock, 10),
        Price: parseFloat(formData.Price),
        DiscountPrice: parseFloat(formData.DiscountPrice),
      }
    });

    return new Response(
      JSON.stringify({ success: true, message: "Product added successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding product:", error);
    return new Response(
      JSON.stringify({ success: false, message: "An error occurred while adding the product." }),
      { status: 500 }
    );
  }
}
