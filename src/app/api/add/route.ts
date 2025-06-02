export async function POST(req: Request) {
  const { prisma } = await import("@/lib/prisma");
  const { getNextProductId } = await import("@/lib/productIdGenerator");

  const formData = await req.json();

  try {
    const nextProductId = await getNextProductId();

    await prisma.grocery.create({
      data: {
        ...formData,
        ProductId: nextProductId,
        Stock: parseInt(formData.Stock, 10),
        Price: parseFloat(formData.Price),
        DiscountPrice: parseFloat(formData.DiscountPrice),
      },
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
