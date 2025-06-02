// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const productIds: number[] = await req.json();

//   const { prisma } = await import("@/lib/prisma"); // lazy import

//   try {
//     await Promise.all(
//       productIds.map((ProductId) =>
//         prisma.grocery.delete({
//           where: { ProductId },
//         })
//       )
//     );

//     console.log(productIds);

//     return NextResponse.json({ status: "success", message: "Deleted!" });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { status: "error", message: "Failed to Delete." },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { status: "error", message: "Delete disabled by Admin" },
    { status: 500 }
  );
}
