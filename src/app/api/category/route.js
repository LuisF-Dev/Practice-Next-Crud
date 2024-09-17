import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const category = await prisma.category.findMany();
    return NextResponse.json(category);
}
