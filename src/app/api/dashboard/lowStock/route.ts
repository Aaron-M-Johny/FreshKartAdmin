import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const data =await prisma.grocery.findMany({
        where:{
            Stock: {
                lt: 20,
            }
        }
    })
    return NextResponse.json({data})
}