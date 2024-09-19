const { prisma } = require("@/libs/prisma");
const { NextResponse } = require("next/server");

export async function DELETE(request, { params }) {
    const category = await prisma.category.delete({
        where: { id: Number(params.id) },
    });
    return NextResponse.json(category);
}
