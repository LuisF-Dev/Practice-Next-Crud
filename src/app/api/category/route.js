import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const category = await prisma.category.findMany();
    return NextResponse.json(category);
}

export async function POST(request) {
    const data = await request.json();
    const newCategory = await prisma.category.create({
        data: data,
    });
    return NextResponse.json(newCategory);
}
