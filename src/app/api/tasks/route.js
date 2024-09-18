import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
    const tasks = await prisma.tasks.findMany({});
    return NextResponse.json(tasks);
}

export async function POST(request) {
    const data = await request.json();
    const { title, description, categoryId } = data;
    const user = await prisma.tasks.create({
        data: {
            title: title,
            description: description,
            category_id: Number(categoryId),
        },
    });
    return NextResponse.json("creado exitosamente: " + user);
}
