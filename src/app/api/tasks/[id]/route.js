import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const task = await prisma.tasks.findUnique({
        where: {
            id: Number(params.id),
        },
    });

    return NextResponse.json([{ "recibiendo tarea": params.id }, { task }]);
}

export async function PUT(request, { params }) {
    const data = await request.json();
    const { title, description, done, categoryId } = data;
    const task = await prisma.tasks.update({
        where: {
            id: Number(params.id),
        },
        data: {
            title: title,
            description: description,
            done: done,
            category_id: categoryId,
        },
    });
    return NextResponse.json([{ "modificando tarea": params.id }, { task }]);
}

export async function DELETE(request, { params }) {
    const task = await prisma.tasks.delete({
        where: {
            id: Number(params.id),
        },
    });
    return NextResponse.json([{ "eliminando tarea": params.id }, { task }]);
}
