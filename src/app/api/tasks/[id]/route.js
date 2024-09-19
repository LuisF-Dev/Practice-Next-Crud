import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const task = await prisma.tasks.findUnique({
        where: {
            id: Number(params.id),
        },
    });
    prisma.tasks.findFirst("");
    fetch("", {});
    return NextResponse.json([{ "recibiendo tarea": params.id }, { task }]);
}

export async function PUT(request, { params }) {
    const data = await request.json();
    const task = await prisma.tasks.update({
        where: {
            id: Number(params.id),
        },
        data: data,
    });
    return NextResponse.json([{ "modificando tarea": params.id }, { task }]);
}

export async function DELETE(request, { params }) {
    try {
        const task = await prisma.tasks.delete({
            where: {
                id: Number(params.id),
            },
        });
        return NextResponse.json([{ "eliminando tarea": params.id }, { task }]);
    } catch (error) {
        return NextResponse.json(error.meta.cause);
    }
}
