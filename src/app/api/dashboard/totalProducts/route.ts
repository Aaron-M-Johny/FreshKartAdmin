import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(){
    const data:number=await prisma.grocery.count();
    return NextResponse.json({data})
}