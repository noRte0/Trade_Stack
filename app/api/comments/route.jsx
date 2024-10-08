import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import prisma from '@/app/utils/connect';

// GET ALL COMMENTS OF A POST
export const GET = async (req) => {
    const { searchParams } = new URL(req.url);
    const blogSlug = searchParams.get("blogSlug");

    try {
        const comments = await prisma.comment.findMany({
            where: {
                ...(blogSlug && { blogSlug }),
            },
            include: { user: true },
        });

        return NextResponse.json(comments, { status: 200 });
    } catch (err) {
        console.error("Error fetching comments:", err);
        return NextResponse.json(
            { message: "Something went wrong!" },
            { status: 500 }
        );
    }
};

// CREATE A COMMENT
export const POST = async (req) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new NextResponse(
            JSON.stringify({ message: "Not Authenticated!" }),
            { status: 401 }
        );
    }

    try {
        const body = await req.json();
        const comment = await prisma.comment.create({
            data: { ...body, userEmail: session.user.email },
        });

        return new NextResponse(JSON.stringify(comment), { status: 200 });
    } catch (err) {
        console.error("Error creating comment:", err);
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!" }),
            { status: 500 }
        );
    }
};
